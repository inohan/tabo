import type { Document, Element } from '@xmldom/xmldom';
import { MAIN_NS, type XlsxPackage } from './package';
import type { XlsxStyles } from './styles';
import { formatRef, type CellRef } from './ref';

/** Every value this client will hand back for a cell. */
export type XlsxCellValue = string | number | boolean | Date | null;

/**
 * The subset that can be written back.
 *
 * `Date` is deliberately absent: a date cell is a plain number plus a
 * date-formatted style, so writing one would mean appending an `xf` to
 * `styles.xml`. Leaving it out keeps the write path from touching styles at
 * all.
 */
export type XlsxWritableValue = string | number | boolean | null;

const firstChild = (element: Element, name: string): Element | undefined =>
  element.getElementsByTagNameNS(MAIN_NS, name)[0];

/**
 * Reads the shared string table.
 *
 * A cell with `t="s"` holds an index into this table rather than its own text.
 * Entries may be split across several formatting runs — `Team ` + `D` when
 * part of the text is bold — so the whole entry's text content is taken,
 * which collapses the runs back into one string.
 */
export const readSharedStrings = (pkg: XlsxPackage): string[] => {
  const document = pkg.findDocument('xl/sharedStrings.xml');
  if (document === undefined) return [];

  const items = document.getElementsByTagNameNS(MAIN_NS, 'si');
  const strings: string[] = [];
  for (let i = 0; i < items.length; i++) {
    strings.push(items[i]?.textContent ?? '');
  }
  return strings;
};

export type CellContext = {
  sharedStrings: readonly string[];
  styles: XlsxStyles;
};

/**
 * Decodes one `<c>` element.
 *
 * Formulas are never evaluated: a formula cell carries both its `<f>` and the
 * result Excel last cached in `<v>`, and the cached result is what is read.
 */
export const decodeCell = (
  cell: Element,
  { sharedStrings, styles }: CellContext,
): XlsxCellValue => {
  const type = cell.getAttribute('t');

  // Inline strings keep their text in <is> instead of <v>, and are what
  // several non-Excel producers (Google Sheets among them) emit.
  if (type === 'inlineStr') {
    return firstChild(cell, 'is')?.textContent ?? null;
  }

  const value = firstChild(cell, 'v')?.textContent;
  if (value === undefined || value === null) return null;

  switch (type) {
    case 's': {
      const index = Number(value);
      return sharedStrings[index] ?? null;
    }
    case 'str':
      return value;
    case 'b':
      return value !== '0';
    // An error cell (#DIV/0!, #N/A) has no usable value, so it reads as blank
    // rather than leaking the error text in as though it were data.
    case 'e':
      return null;
    default: {
      const numeric = Number(value);
      if (Number.isNaN(numeric)) return value;
      const styleAttribute = cell.getAttribute('s');
      const styleIndex =
        styleAttribute === null ? undefined : Number(styleAttribute);
      return styles.isDateStyle(styleIndex) ? styles.toDate(numeric) : numeric;
    }
  }
};

/**
 * Builds a `<c>` element for a value, or returns `undefined` for `null` — a
 * blank cell is represented by having no element at all, which is how Excel
 * itself writes them.
 *
 * Strings are written inline rather than added to the shared string table, so
 * writing never has to touch `sharedStrings.xml` or keep its counts in step.
 */
export const encodeCell = (
  document: Document,
  ref: CellRef,
  value: XlsxWritableValue,
): Element | undefined => {
  if (value === null) return undefined;

  const cell = document.createElementNS(MAIN_NS, 'c');
  cell.setAttribute('r', formatRef(ref));

  if (typeof value === 'string') {
    cell.setAttribute('t', 'inlineStr');
    const is = document.createElementNS(MAIN_NS, 'is');
    const t = document.createElementNS(MAIN_NS, 't');
    // Excel trims surrounding whitespace unless it is told not to.
    if (value !== value.trim()) {
      t.setAttribute('xml:space', 'preserve');
    }
    t.appendChild(document.createTextNode(value));
    is.appendChild(t);
    cell.appendChild(is);
    return cell;
  }

  const v = document.createElementNS(MAIN_NS, 'v');
  if (typeof value === 'boolean') {
    cell.setAttribute('t', 'b');
    v.appendChild(document.createTextNode(value ? '1' : '0'));
  } else {
    v.appendChild(document.createTextNode(String(value)));
  }
  cell.appendChild(v);
  return cell;
};
