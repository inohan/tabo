import { FileError, NotFoundError } from '@shared/domain';
import { err, ok } from 'neverthrow';
import { XlsxWorkbook, XlsxFormatError } from './xlsx';

export class ExcelClient {
  async open(input: Uint8Array) {
    try {
      const wb = await XlsxWorkbook.open(input);
      return ok(wb);
    } catch (e) {
      if (e instanceof XlsxFormatError) {
        return err(
          new FileError(`Failed to read excel file: ${e.message}`, {
            cause: e,
          }),
        );
      }
      throw e;
    }
  }

  async getTables(input: Uint8Array) {
    try {
      const wb = await XlsxWorkbook.open(input);
      return ok(
        wb.getSheets().flatMap((sheet, sheetIndex) =>
          sheet.getTables().map((table) => ({
            id: table.name,
            name: table.name,
            sheet: {
              index: sheetIndex,
              name: sheet.name,
            },
          })),
        ),
      );
    } catch (e) {
      if (e instanceof XlsxFormatError) {
        return err(
          new FileError(`Failed to read excel file: ${e.message}`, {
            cause: e,
          }),
        );
      }
      throw e;
    }
  }

  async getTableValue(input: Uint8Array, tableId: string) {
    try {
      const wb = await XlsxWorkbook.open(input);
      const table = wb.getTable(tableId);
      if (table === undefined) {
        return err(new NotFoundError(`Table ${tableId} does not exist.`));
      }
      const headers = table.headers;
      const data = table.rows;
      return ok({
        headers,
        data,
      });
    } catch (e) {
      if (e instanceof XlsxFormatError) {
        return err(
          new FileError(`Failed to read excel file: ${e.message}`, {
            cause: e,
          }),
        );
      }
      throw e;
    }
  }
}
