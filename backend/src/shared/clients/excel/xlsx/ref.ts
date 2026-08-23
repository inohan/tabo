import { XlsxFormatError } from './error';

/** A single cell position. Both parts are 1-based, matching A1 notation. */
export type CellRef = { col: number; row: number };

/** An inclusive rectangle of cells. */
export type RangeRef = { start: CellRef; end: CellRef };

const REF_PATTERN = /^\$?([A-Z]+)\$?([1-9][0-9]*)$/;

/**
 * `'A'` -> 1, `'Z'` -> 26, `'AA'` -> 27.
 *
 * Column labels are bijective base-26: there is no zero digit, so `'AA'`
 * follows `'Z'` rather than restarting a decade.
 */
export const colToIndex = (label: string): number => {
  let index = 0;
  for (const char of label) {
    index = index * 26 + (char.charCodeAt(0) - 64);
  }
  return index;
};

/** Inverse of {@link colToIndex}. `1` -> `'A'`, `27` -> `'AA'`. */
export const indexToCol = (index: number): string => {
  let label = '';
  let remaining = index;
  while (remaining > 0) {
    const digit = (remaining - 1) % 26;
    label = String.fromCharCode(65 + digit) + label;
    remaining = (remaining - digit - 1) / 26;
  }
  return label;
};

/**
 * Parses `'A1'` or `'$A$1'`. The absolute-reference dollars carry no meaning
 * outside a formula, so they are accepted and discarded.
 */
export const parseRef = (ref: string): CellRef => {
  const match = REF_PATTERN.exec(ref.trim().toUpperCase());
  if (match === null) {
    throw new XlsxFormatError(`Malformed cell reference: ${ref}`);
  }
  // The pattern has two capture groups, so both are present whenever it matches.
  return { col: colToIndex(match[1]!), row: Number(match[2]!) };
};

/**
 * Parses `'A1:H5'`, or a bare `'A1'` as a one-cell range.
 *
 * The corners are normalised, so a range written backwards (`'H5:A1'`) yields
 * the same rectangle as the forward form.
 */
export const parseRange = (ref: string): RangeRef => {
  const [rawStart, rawEnd, ...rest] = ref.split(':');
  if (rawStart === undefined || rest.length > 0) {
    throw new XlsxFormatError(`Malformed range reference: ${ref}`);
  }
  const start = parseRef(rawStart);
  const end = rawEnd === undefined ? start : parseRef(rawEnd);
  return {
    start: {
      col: Math.min(start.col, end.col),
      row: Math.min(start.row, end.row),
    },
    end: {
      col: Math.max(start.col, end.col),
      row: Math.max(start.row, end.row),
    },
  };
};

export const formatRef = ({ col, row }: CellRef): string =>
  `${indexToCol(col)}${row}`;

export const formatRange = ({ start, end }: RangeRef): string =>
  `${formatRef(start)}:${formatRef(end)}`;
