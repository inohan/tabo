import { GoogleSheetsClient } from '@importer/clients/google-sheet';
import { ImportFileReaderPort } from './import-file-reader';
import { err, ok, safeTry } from 'neverthrow';
import { NotFoundError } from '@shared/domain';

export class GoogleSheetsImportFileReader extends ImportFileReaderPort {
  constructor(
    private spreadsheetId: string,
    private tableId: string,
    private googleSheetsClient: GoogleSheetsClient,
  ) {
    super();
  }

  async read() {
    return await safeTry(
      async function* (this: GoogleSheetsImportFileReader) {
        const metadata = yield* await this.googleSheetsClient.getMetaData(
          this.spreadsheetId,
        );
        const tables = metadata.sheets.flatMap((sheet) =>
          sheet.tables.map((table) => ({
            ...table,
            sheetId: sheet.properties.sheetId,
            sheetName: sheet.properties.title,
          })),
        );
        const table = tables.find((table) => (table.tableId = this.tableId));
        if (table === undefined) {
          return yield* err(new NotFoundError('Cannot find table'));
        }
        const tableData = yield* await this.googleSheetsClient.readTable({
          spreadsheetId: this.spreadsheetId,
          sheetName: table.sheetName,
          table,
        });
        return ok(tableData);
      }.bind(this),
    );
  }
}
