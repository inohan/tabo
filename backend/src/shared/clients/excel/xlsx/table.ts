import type { Element } from '@xmldom/xmldom';
import { MAIN_NS, type XlsxPackage } from './package';
import type { XlsxSheet } from './sheet';
import type { XlsxCellValue, XlsxWritableValue } from './cell';
import { formatRange, indexToCol, parseRange, type RangeRef } from './ref';
import { XlsxFormatError } from './error';

/**
 * A table (a "ListObject" in Excel's own terms): a named, structured region
 * of a sheet with its own header row.
 *
 * This is the thing the importer actually cares about, and the reason the
 * OOXML parts are read directly — table definitions live in their own part,
 * and the column list there is authoritative. Reading headers off the sheet
 * instead would pick up whatever text happens to sit in the first row.
 */
export class XlsxTable {
  constructor(
    private readonly pkg: XlsxPackage,
    private readonly part: string,
    private readonly sheet: XlsxSheet,
  ) {}

  private root(): Element {
    const root = this.pkg
      .readDocument(this.part)
      .getElementsByTagNameNS(MAIN_NS, 'table')[0];
    if (root === undefined) {
      throw new XlsxFormatError(
        `Table part ${this.part} has no table element.`,
      );
    }
    return root;
  }

  /** The table's name, as shown in Excel's name box. */
  get name(): string {
    const root = this.root();
    const name = root.getAttribute('name') ?? root.getAttribute('displayName');
    if (name === null) {
      throw new XlsxFormatError(`Table part ${this.part} has no name.`);
    }
    return name;
  }

  get sheetName(): string {
    return this.sheet.name;
  }

  /** The whole table including its header row. */
  get ref(): RangeRef {
    const ref = this.root().getAttribute('ref');
    if (ref === null) {
      throw new XlsxFormatError(`Table ${this.part} has no ref.`);
    }
    return parseRange(ref);
  }

  /**
   * How many rows at the top are headers. Almost always 1; a table can be
   * configured with none, in which case every row is data.
   */
  private get headerRowCount(): number {
    const value = this.root().getAttribute('headerRowCount');
    return value === null ? 1 : Number(value);
  }

  /** Trailing totals row, if the table shows one. */
  private get totalsRowCount(): number {
    const value = this.root().getAttribute('totalsRowCount');
    return value === null ? 0 : Number(value);
  }

  private columnElements(): Element[] {
    const container = this.root().getElementsByTagNameNS(
      MAIN_NS,
      'tableColumns',
    )[0];
    if (container === undefined) return [];

    const nodes = container.getElementsByTagNameNS(MAIN_NS, 'tableColumn');
    const columns: Element[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node !== undefined) columns.push(node);
    }
    return columns;
  }

  /** Column names, taken from the table definition rather than the sheet. */
  get headers(): string[] {
    return this.columnElements().map(
      (column) => column.getAttribute('name') ?? '',
    );
  }

  /**
   * Data rows, header and totals rows excluded.
   *
   * Every row is padded to the table's full width, so a row is always as long
   * as {@link headers} even where the sheet omitted its trailing blanks.
   */
  get rows(): XlsxCellValue[][] {
    const { start, end } = this.ref;
    const firstDataRow = start.row + this.headerRowCount;
    const lastDataRow = end.row - this.totalsRowCount;
    if (firstDataRow > lastDataRow) return [];

    return this.sheet.getRange({
      start: { col: start.col, row: firstDataRow },
      end: { col: end.col, row: lastDataRow },
    });
  }

  /**
   * Appends a column to the right of the table and fills it down.
   *
   * Excel validates a table against its sheet when opening the file and
   * offers to repair anything inconsistent, so all four of these have to move
   * together: the table's own `ref`, the autofilter over it, the column list,
   * and the header cell written into the sheet. The header cell text in
   * particular must match the column name exactly.
   *
   * `values` is positional over the data rows; a short list leaves the
   * remaining rows blank.
   */
  addColumn(name: string, values: readonly XlsxWritableValue[]): void {
    const existing = this.headers;
    if (existing.includes(name)) {
      throw new XlsxFormatError(
        `Table ${this.name} already has a column named ${name}.`,
      );
    }

    const { start, end } = this.ref;
    const column = end.col + 1;
    const widened: RangeRef = { start, end: { col: column, row: end.row } };

    const document = this.pkg.mutateDocument(this.part);
    const root = this.root();
    root.setAttribute('ref', formatRange(widened));

    // The autofilter spans the table, so it has to widen with it.
    const autoFilter = root.getElementsByTagNameNS(MAIN_NS, 'autoFilter')[0];
    if (autoFilter !== undefined && autoFilter.getAttribute('ref') !== null) {
      autoFilter.setAttribute('ref', formatRange(widened));
    }

    const container = root.getElementsByTagNameNS(MAIN_NS, 'tableColumns')[0];
    if (container === undefined) {
      throw new XlsxFormatError(
        `Table ${this.name} has no tableColumns element.`,
      );
    }

    // Column ids only have to be unique within the table, not contiguous.
    const nextId =
      this.columnElements().reduce(
        (max, element) =>
          Math.max(max, Number(element.getAttribute('id') ?? 0)),
        0,
      ) + 1;

    const element = document.createElementNS(MAIN_NS, 'tableColumn');
    element.setAttribute('id', String(nextId));
    element.setAttribute('name', name);
    container.appendChild(element);
    container.setAttribute('count', String(existing.length + 1));

    this.sheet.setCell({ col: column, row: start.row }, name);

    const firstDataRow = start.row + this.headerRowCount;
    const lastDataRow = end.row - this.totalsRowCount;
    for (let row = firstDataRow; row <= lastDataRow; row++) {
      const value = values[row - firstDataRow];
      this.sheet.setCell({ col: column, row }, value ?? null);
    }

    this.sheet.growDimension(widened);
  }

  /** The column letter a further {@link addColumn} would occupy. */
  get nextColumnLabel(): string {
    return indexToCol(this.ref.end.col + 1);
  }
}
