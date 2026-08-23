import { unzip, zip, type Unzipped } from 'fflate';
import {
  DOMParser,
  XMLSerializer,
  onErrorStopParsing,
  type Document,
} from '@xmldom/xmldom';
import { XlsxFormatError } from './error';

/** Namespace of the SpreadsheetML parts (`workbook.xml`, sheets, tables). */
export const MAIN_NS =
  'http://schemas.openxmlformats.org/spreadsheetml/2006/main';

/** Namespace of the `r:id` attributes that point at relationships. */
export const RELS_NS =
  'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

/** Namespace of the `.rels` part contents themselves. */
export const PACKAGE_RELS_NS =
  'http://schemas.openxmlformats.org/package/2006/relationships';

/**
 * Guards against hostile uploads. An xlsx is a zip, so a small file can
 * declare an enormous expansion; these caps bound what a single request can
 * cost before any of it is parsed.
 */
const MAX_INPUT_BYTES = 32 * 1024 * 1024;
const MAX_EXPANDED_BYTES = 256 * 1024 * 1024;
const MAX_ENTRIES = 2048;

/** A resolved relationship. External targets keep their raw URI. */
export type Rel = { target: string; external: boolean };

const unzipAsync = (input: Uint8Array): Promise<Unzipped> =>
  new Promise((resolve, reject) => {
    unzip(input, (error, result) => (error ? reject(error) : resolve(result)));
  });

const zipAsync = (parts: Record<string, Uint8Array>): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    zip(parts, { level: 6 }, (error, result) =>
      error ? reject(error) : resolve(result),
    );
  });

/** Directory of a part path, without the trailing slash. */
const dirname = (path: string): string => {
  const index = path.lastIndexOf('/');
  return index === -1 ? '' : path.slice(0, index);
};

/**
 * Resolves a relationship target against the part that declared it.
 *
 * Targets are relative to the declaring part's own directory and routinely
 * climb out of it (`../tables/table1.xml`), so this normalises `.`/`..`
 * segments and refuses anything that escapes the package root.
 */
export const resolveRelTarget = (basePart: string, target: string): string => {
  const base = target.startsWith('/') ? [] : dirname(basePart).split('/');
  const segments = target.replace(/^\//, '').split('/');
  const resolved = base.filter((segment) => segment !== '');

  for (const segment of segments) {
    if (segment === '' || segment === '.') continue;
    if (segment === '..') {
      if (resolved.pop() === undefined) {
        throw new XlsxFormatError(
          `Relationship target escapes the package root: ${target}`,
        );
      }
      continue;
    }
    resolved.push(segment);
  }
  return resolved.join('/');
};

/**
 * The zip container behind a workbook: every part as bytes, plus lazily
 * parsed DOM documents for the parts that are actually inspected.
 *
 * Only parts handed out by {@link mutateDocument} are re-serialised on the way
 * out; everything else is written back byte-for-byte as it arrived. That keeps
 * formatting, themes, and any part this client does not model intact.
 */
export class XlsxPackage {
  private readonly documents = new Map<string, Document>();
  private readonly dirty = new Set<string>();
  private readonly relsCache = new Map<string, Map<string, Rel>>();

  private constructor(private readonly parts: Map<string, Uint8Array>) {}

  static async open(input: Uint8Array): Promise<XlsxPackage> {
    if (input.byteLength > MAX_INPUT_BYTES) {
      throw new XlsxFormatError(
        `Excel file is too large: ${input.byteLength} bytes exceeds the ${MAX_INPUT_BYTES} byte limit.`,
      );
    }

    let unzipped: Unzipped;
    try {
      unzipped = await unzipAsync(input);
    } catch (e) {
      throw new XlsxFormatError(
        `Not a readable zip archive: ${e instanceof Error ? e.message : String(e)}`,
        { cause: e },
      );
    }

    const entries = Object.entries(unzipped);
    if (entries.length > MAX_ENTRIES) {
      throw new XlsxFormatError(
        `Excel file has too many parts: ${entries.length} exceeds the ${MAX_ENTRIES} limit.`,
      );
    }

    let expanded = 0;
    for (const [, bytes] of entries) {
      expanded += bytes.byteLength;
      if (expanded > MAX_EXPANDED_BYTES) {
        throw new XlsxFormatError(
          `Excel file expands to more than the ${MAX_EXPANDED_BYTES} byte limit.`,
        );
      }
    }

    const parts = new Map(entries);
    if (!parts.has('xl/workbook.xml')) {
      throw new XlsxFormatError(
        'Not an xlsx package: xl/workbook.xml is missing.',
      );
    }
    return new XlsxPackage(parts);
  }

  has(part: string): boolean {
    return this.parts.has(part);
  }

  /** Parsed part, or `undefined` when the package does not contain it. */
  findDocument(part: string): Document | undefined {
    const cached = this.documents.get(part);
    if (cached !== undefined) return cached;

    const bytes = this.parts.get(part);
    if (bytes === undefined) return undefined;

    const text = new TextDecoder('utf-8').decode(bytes);
    let document: Document;
    try {
      document = new DOMParser({
        onError: onErrorStopParsing,
      }).parseFromString(text, 'text/xml');
    } catch (e) {
      throw new XlsxFormatError(
        `Part ${part} is not well-formed XML: ${e instanceof Error ? e.message : String(e)}`,
        { cause: e },
      );
    }
    this.documents.set(part, document);
    return document;
  }

  /** Parsed part. Throws when the package does not contain it. */
  readDocument(part: string): Document {
    const document = this.findDocument(part);
    if (document === undefined) {
      throw new XlsxFormatError(`Required part is missing: ${part}`);
    }
    return document;
  }

  /**
   * Same document as {@link readDocument}, but flagged so that {@link toBytes}
   * re-serialises it. Call this before mutating.
   */
  mutateDocument(part: string): Document {
    const document = this.readDocument(part);
    this.dirty.add(part);
    return document;
  }

  /**
   * Relationships declared by a part, keyed by `rId`.
   *
   * `xl/workbook.xml` keeps its relationships in `xl/_rels/workbook.xml.rels`;
   * a part with no `.rels` sidecar simply has none.
   */
  rels(part: string): Map<string, Rel> {
    const cached = this.relsCache.get(part);
    if (cached !== undefined) return cached;

    const relsPart = `${dirname(part)}/_rels/${part.slice(dirname(part).length + 1)}.rels`;
    const rels = new Map<string, Rel>();
    const document = this.findDocument(relsPart);

    if (document !== undefined) {
      const nodes = document.getElementsByTagNameNS(
        PACKAGE_RELS_NS,
        'Relationship',
      );
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node === undefined) continue;
        const id = node.getAttribute('Id');
        const target = node.getAttribute('Target');
        if (id === null || target === null) continue;
        const external = node.getAttribute('TargetMode') === 'External';
        rels.set(id, {
          target: external ? target : resolveRelTarget(part, target),
          external,
        });
      }
    }
    this.relsCache.set(part, rels);
    return rels;
  }

  /**
   * Re-zips the package, serialising only the parts that were mutated.
   *
   * `[Content_Types].xml` is written first because some readers expect it at
   * the head of the archive.
   */
  async toBytes(): Promise<Uint8Array> {
    const encoder = new TextEncoder();
    const out: Record<string, Uint8Array> = {};

    const names = [...this.parts.keys()].sort((a, b) =>
      a === '[Content_Types].xml' ? -1 : b === '[Content_Types].xml' ? 1 : 0,
    );

    for (const name of names) {
      const original = this.parts.get(name);
      if (original === undefined) continue;

      if (!this.dirty.has(name)) {
        out[name] = original;
        continue;
      }

      const document = this.documents.get(name);
      if (document === undefined) {
        out[name] = original;
        continue;
      }

      let xml = new XMLSerializer().serializeToString(document);
      // The parser normalises line endings, so a document that arrived with a
      // CRLF after its XML declaration comes back with a bare LF. Restoring it
      // keeps mutated parts byte-identical apart from the intended edit.
      if (new TextDecoder('utf-8').decode(original).startsWith('<?xml')) {
        const originalText = new TextDecoder('utf-8').decode(original);
        if (originalText.includes('?>\r\n')) {
          xml = xml.replace('?>\n', '?>\r\n');
        }
      }
      out[name] = encoder.encode(xml);
    }
    return zipAsync(out);
  }
}
