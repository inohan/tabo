/**
 * Raised when a byte stream is not a readable xlsx package, or when a part it
 * must contain is missing or malformed.
 *
 * This is an infrastructure error local to this client, not a domain error.
 * `ExcelClient` is the single place that catches it and converts it into a
 * `FileError`; everything below that boundary throws.
 */
export class XlsxFormatError extends Error {
  override name = 'XlsxFormatError';
  private __xlsxFormatError!: void;
}
