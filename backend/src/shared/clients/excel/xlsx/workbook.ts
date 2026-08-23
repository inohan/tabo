import { MAIN_NS, RELS_NS, XlsxPackage } from './package';
import { readSharedStrings, type CellContext } from './cell';
import { XlsxStyles } from './styles';
import { XlsxSheet } from './sheet';
import type { XlsxTable } from './table';
import { XlsxFormatError } from './error';

/**
 * A workbook opened from xlsx bytes.
 *
 * An xlsx is a zip of XML parts, and only a handful of them describe a table,
 * so they are read directly here. Every general-purpose library that was
 * tried either mangled tables — dropping columns that carry a calculated-column
 * formula, reading the header row back as data — or could only write by
 * regenerating the whole package and discarding everything it did not model.
 *
 * Mutations are applied to the parsed part and nothing else: {@link toBytes}
 * re-serialises only the parts that were touched and copies the rest through
 * unchanged, so styles, themes, and unmodelled parts survive a round trip
 * byte-for-byte.
 *
 * Navigation throws {@link XlsxFormatError} rather than returning a `Result`;
 * `ExcelClient` is the single boundary that converts it.
 */
export class XlsxWorkbook {
  private sheets: XlsxSheet[] | undefined;

  private constructor(
    private readonly pkg: XlsxPackage,
    private readonly context: CellContext,
  ) {}

  static async open(input: Uint8Array): Promise<XlsxWorkbook> {
    const pkg = await XlsxPackage.open(input);
    return new XlsxWorkbook(pkg, {
      sharedStrings: readSharedStrings(pkg),
      styles: XlsxStyles.from(pkg),
    });
  }

  /** Sheets in tab order, hidden ones included. */
  getSheets(): XlsxSheet[] {
    if (this.sheets !== undefined) return this.sheets;

    const document = this.pkg.readDocument('xl/workbook.xml');
    const rels = this.pkg.rels('xl/workbook.xml');
    const container = document.getElementsByTagNameNS(MAIN_NS, 'sheets')[0];
    if (container === undefined) {
      throw new XlsxFormatError('Workbook has no sheets element.');
    }

    const nodes = container.getElementsByTagNameNS(MAIN_NS, 'sheet');
    const sheets: XlsxSheet[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node === undefined) continue;
      const name = node.getAttribute('name');
      const id = node.getAttributeNS(RELS_NS, 'id');
      if (name === null || id === null) continue;

      const rel = rels.get(id);
      if (rel === undefined || rel.external) continue;
      sheets.push(new XlsxSheet(this.pkg, rel.target, name, this.context));
    }

    this.sheets = sheets;
    return sheets;
  }

  getSheet(name: string): XlsxSheet | undefined {
    return this.getSheets().find((sheet) => sheet.name === name);
  }

  /** Every table in the workbook, across all sheets. */
  getTables(): XlsxTable[] {
    return this.getSheets().flatMap((sheet) => sheet.getTables());
  }

  /** Table names are unique workbook-wide, so no sheet is needed to find one. */
  getTable(name: string): XlsxTable | undefined {
    return this.getTables().find((table) => table.name === name);
  }

  /** The workbook as xlsx bytes, with any mutations applied. */
  toBytes(): Promise<Uint8Array> {
    return this.pkg.toBytes();
  }
}
