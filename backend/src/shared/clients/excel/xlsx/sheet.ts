import type { Element } from '@xmldom/xmldom';
import { MAIN_NS, RELS_NS, type XlsxPackage } from './package';
import {
  decodeCell,
  encodeCell,
  type CellContext,
  type XlsxCellValue,
  type XlsxWritableValue,
} from './cell';
import { XlsxTable } from './table';
import { formatRange, parseRange, type CellRef, type RangeRef } from './ref';
import { XlsxFormatError } from './error';

/**
 * One worksheet.
 *
 * Rows and cells are both sparse in the file — a row with nothing after
 * column D simply stops, and a blank cell in the middle of a row is omitted
 * rather than written empty. Everything here therefore indexes by the `r`
 * attribute and never by position, which is what keeps a gap from silently
 * shifting every later column left.
 */
export class XlsxSheet {
  private cells: Map<number, Map<number, Element>> | undefined;
  private rows: Map<number, Element> | undefined;

  constructor(
    private readonly pkg: XlsxPackage,
    private readonly part: string,
    readonly name: string,
    private readonly context: CellContext,
  ) {}

  private index(): {
    cells: Map<number, Map<number, Element>>;
    rows: Map<number, Element>;
  } {
    if (this.cells !== undefined && this.rows !== undefined) {
      return { cells: this.cells, rows: this.rows };
    }

    const cells = new Map<number, Map<number, Element>>();
    const rows = new Map<number, Element>();
    const document = this.pkg.readDocument(this.part);
    const rowNodes = document.getElementsByTagNameNS(MAIN_NS, 'row');

    for (let i = 0; i < rowNodes.length; i++) {
      const rowNode = rowNodes[i];
      if (rowNode === undefined) continue;
      // `r` is optional in the schema; when it is absent the row's position
      // among its siblings is the only thing left to go on.
      const rowNumber = Number(rowNode.getAttribute('r') ?? i + 1);
      rows.set(rowNumber, rowNode);

      const rowCells = new Map<number, Element>();
      const cellNodes = rowNode.getElementsByTagNameNS(MAIN_NS, 'c');
      for (let j = 0; j < cellNodes.length; j++) {
        const cellNode = cellNodes[j];
        if (cellNode === undefined) continue;
        const ref = cellNode.getAttribute('r');
        const column = ref === null ? j + 1 : parseRange(ref).start.col;
        rowCells.set(column, cellNode);
      }
      cells.set(rowNumber, rowCells);
    }

    this.cells = cells;
    this.rows = rows;
    return { cells, rows };
  }

  private invalidate(): void {
    this.cells = undefined;
    this.rows = undefined;
  }

  /** Value at a single reference, e.g. `'B2'`. Blank cells read as `null`. */
  getCell(ref: string | CellRef): XlsxCellValue {
    const { col, row } = typeof ref === 'string' ? parseRange(ref).start : ref;
    const cell = this.index().cells.get(row)?.get(col);
    return cell === undefined ? null : decodeCell(cell, this.context);
  }

  /**
   * Values across a rectangle, e.g. `'A1:H5'`, or a single cell as a 1x1
   * grid. The result is always a full rectangle, padded with `null`.
   */
  getRange(ref: string | RangeRef): XlsxCellValue[][] {
    const { start, end } = typeof ref === 'string' ? parseRange(ref) : ref;
    const { cells } = this.index();
    const grid: XlsxCellValue[][] = [];

    for (let row = start.row; row <= end.row; row++) {
      const rowCells = cells.get(row);
      const values: XlsxCellValue[] = [];
      for (let col = start.col; col <= end.col; col++) {
        const cell = rowCells?.get(col);
        values.push(cell === undefined ? null : decodeCell(cell, this.context));
      }
      grid.push(values);
    }
    return grid;
  }

  /** Tables defined on this sheet, in the order the sheet declares them. */
  getTables(): XlsxTable[] {
    const document = this.pkg.readDocument(this.part);
    const rels = this.pkg.rels(this.part);
    const parts = document.getElementsByTagNameNS(MAIN_NS, 'tablePart');
    const tables: XlsxTable[] = [];

    for (let i = 0; i < parts.length; i++) {
      const id = parts[i]?.getAttributeNS(RELS_NS, 'id');
      if (id === null || id === undefined) continue;
      const rel = rels.get(id);
      if (rel === undefined || rel.external) continue;
      tables.push(new XlsxTable(this.pkg, rel.target, this));
    }
    return tables;
  }

  /** Named table on this sheet, or the first one when no name is given. */
  getTable(name?: string): XlsxTable | undefined {
    const tables = this.getTables();
    return name === undefined
      ? tables[0]
      : tables.find((table) => table.name === name);
  }

  /**
   * Writes a value into a cell, creating the row if the sheet does not have
   * one yet.
   *
   * Cells are appended, which is correct only while writes stay at the right
   * edge of the used range: within a row they must remain in ascending column
   * order, so inserting into the middle would need an ordered insert instead.
   */
  setCell(ref: CellRef, value: XlsxWritableValue): void {
    const document = this.pkg.mutateDocument(this.part);
    const cell = encodeCell(document, ref, value);
    if (cell === undefined) return;

    const { rows } = this.index();
    const existing = rows.get(ref.row);
    if (existing !== undefined) {
      existing.appendChild(cell);
      this.growSpans(existing, ref.col);
      this.invalidate();
      return;
    }

    const sheetData = document.getElementsByTagNameNS(MAIN_NS, 'sheetData')[0];
    if (sheetData === undefined) {
      throw new XlsxFormatError(`Sheet ${this.name} has no sheetData element.`);
    }
    const row = document.createElementNS(MAIN_NS, 'row');
    row.setAttribute('r', String(ref.row));
    row.appendChild(cell);

    // Rows must stay in ascending order, so slot the new one in front of the
    // first row that comes after it.
    const later = [...rows.entries()]
      .filter(([number]) => number > ref.row)
      .sort(([a], [b]) => a - b)[0];
    if (later === undefined) {
      sheetData.appendChild(row);
    } else {
      sheetData.insertBefore(row, later[1]);
    }
    this.invalidate();
  }

  /**
   * Widens a row's `spans` hint to include a newly written column.
   *
   * Like `<dimension>` this only summarises which columns the row uses, but
   * leaving it narrower than the row's actual contents is exactly the kind of
   * internal disagreement that prompts Excel to repair the file.
   */
  private growSpans(row: Element, col: number): void {
    const spans = row.getAttribute('spans');
    if (spans === null) return;

    const [from, to] = spans.split(':').map(Number);
    if (from === undefined || to === undefined || Number.isNaN(from)) return;
    row.setAttribute('spans', `${Math.min(from, col)}:${Math.max(to, col)}`);
  }

  /**
   * Widens the cached `<dimension>` hint to cover `range`.
   *
   * The element is only a hint about the used area, but leaving it too small
   * after adding a column is the kind of inconsistency that makes Excel offer
   * to repair the file.
   */
  growDimension(range: RangeRef): void {
    const document = this.pkg.mutateDocument(this.part);
    const dimension = document.getElementsByTagNameNS(MAIN_NS, 'dimension')[0];
    if (dimension === undefined) return;

    const current = dimension.getAttribute('ref');
    if (current === null) return;

    const existing = parseRange(current);
    dimension.setAttribute(
      'ref',
      formatRange({
        start: {
          col: Math.min(existing.start.col, range.start.col),
          row: Math.min(existing.start.row, range.start.row),
        },
        end: {
          col: Math.max(existing.end.col, range.end.col),
          row: Math.max(existing.end.row, range.end.row),
        },
      }),
    );
  }
}
