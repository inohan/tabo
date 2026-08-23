import { MAIN_NS, type XlsxPackage } from './package';

/**
 * Built-in number formats that denote a date and/or a time.
 *
 * 14-22 are the western date/time formats, 45-47 the elapsed-time ones, and
 * 27-36 / 50-58 the CJK era and date formats — which matter here, because the
 * workbooks this importer receives are frequently saved in a Japanese locale.
 *
 * @see ECMA-376 Part 1, 18.8.30 (numFmt)
 */
const BUILTIN_DATE_FORMATS = new Set<number>([
  ...range(14, 22),
  ...range(27, 36),
  ...range(45, 47),
  ...range(50, 58),
]);

/** Custom formats start here; anything below is one of the built-ins. */
const FIRST_CUSTOM_FORMAT_ID = 164;

const MS_PER_DAY = 86_400_000;

/**
 * Excel's 1900 epoch is offset by two days, not one: it counts from
 * 1900-01-01 as serial 1 *and* believes 1900 was a leap year.
 */
const EPOCH_1900 = Date.UTC(1899, 11, 30);
const EPOCH_1904 = Date.UTC(1904, 0, 1);

/** The serial Excel assigns to its non-existent 1900-02-29. */
const PHANTOM_LEAP_DAY = 60;

function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

/**
 * Whether a format code describes a date or a time.
 *
 * The date tokens are `y m d h s`, but they only count outside quoted
 * literals, escapes, and bracketed sections — otherwise `"day"` or a `[Red]`
 * colour would read as a date. Elapsed-time markers (`[h]`, `[mm]`) are the
 * one bracketed form that does count, and scientific notation is stripped so
 * the `E` in `0.00E+00` is not mistaken for a CJK era token.
 */
export const isDateFormatCode = (code: string): boolean => {
  const stripped = code
    .replace(/\\./g, '')
    .replace(/"[^"]*"/g, '')
    .replace(/\[([hms]+)\]/gi, '$1')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/General/gi, '')
    .replace(/E[+-]/gi, '');
  return /[ymdhs]/i.test(stripped);
};

/**
 * The `s` attribute on a cell is an index into `cellXfs`, and the format it
 * points at is the only thing distinguishing a date from a plain number — the
 * cell itself just holds a serial.
 */
export class XlsxStyles {
  private constructor(
    private readonly numberFormatIds: number[],
    private readonly dateFormatIds: ReadonlySet<number>,
    readonly date1904: boolean,
  ) {}

  static from(pkg: XlsxPackage): XlsxStyles {
    const date1904 = XlsxStyles.readDate1904(pkg);
    const document = pkg.findDocument('xl/styles.xml');
    if (document === undefined) {
      return new XlsxStyles([], BUILTIN_DATE_FORMATS, date1904);
    }

    const dateFormatIds = new Set(BUILTIN_DATE_FORMATS);
    const formats = document.getElementsByTagNameNS(MAIN_NS, 'numFmt');
    for (let i = 0; i < formats.length; i++) {
      const format = formats[i];
      if (format === undefined) continue;
      const id = Number(format.getAttribute('numFmtId'));
      const code = format.getAttribute('formatCode');
      if (!Number.isInteger(id) || code === null) continue;
      if (id >= FIRST_CUSTOM_FORMAT_ID && isDateFormatCode(code)) {
        dateFormatIds.add(id);
      }
    }

    // Only the cellXfs block matters; cellStyleXfs holds named-style
    // definitions that cells reference indirectly and never by `s`.
    const numberFormatIds: number[] = [];
    const cellXfs = document.getElementsByTagNameNS(MAIN_NS, 'cellXfs')[0];
    if (cellXfs !== undefined) {
      const xfs = cellXfs.getElementsByTagNameNS(MAIN_NS, 'xf');
      for (let i = 0; i < xfs.length; i++) {
        numberFormatIds.push(Number(xfs[i]?.getAttribute('numFmtId') ?? 0));
      }
    }
    return new XlsxStyles(numberFormatIds, dateFormatIds, date1904);
  }

  private static readDate1904(pkg: XlsxPackage): boolean {
    const workbookPr = pkg
      .readDocument('xl/workbook.xml')
      .getElementsByTagNameNS(MAIN_NS, 'workbookPr')[0];
    const value = workbookPr?.getAttribute('date1904');
    return value === '1' || value === 'true';
  }

  /** Whether the cell style at index `s` formats its value as a date. */
  isDateStyle(styleIndex: number | undefined): boolean {
    if (styleIndex === undefined) return false;
    const formatId = this.numberFormatIds[styleIndex];
    return formatId !== undefined && this.dateFormatIds.has(formatId);
  }

  /**
   * Converts a date serial to a `Date`, in UTC so the value cannot drift by
   * the server's timezone.
   *
   * Serials below the phantom leap day are shifted forward by one, which is
   * how the 1900 off-by-one resolves. Serial 60 itself has no real date and
   * lands on 1900-02-28.
   */
  toDate(serial: number): Date {
    if (this.date1904) {
      return new Date(EPOCH_1904 + serial * MS_PER_DAY);
    }
    const adjusted = serial < PHANTOM_LEAP_DAY ? serial + 1 : serial;
    return new Date(EPOCH_1900 + adjusted * MS_PER_DAY);
  }
}
