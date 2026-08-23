import { GoogleSheetsClient } from '@importer/clients/google-sheet';
import { ImportOriginSource } from '@importer/domain/values';
import { ExcelClient } from '@shared/clients/excel';
import { FileError, FileId, TournamentId } from '@shared/domain';
import { GetFileService } from '@shared/service';
import { err, ok, safeTry } from 'neverthrow';

export class GetImportOriginCandidateService {
  constructor(
    private getFileService: GetFileService,
    private excelClient: ExcelClient,
    private googleSheetClient: GoogleSheetsClient,
  ) {}

  async execute(tournamentId: TournamentId, fileSource: ImportOriginSource) {
    return await safeTry(
      async function* (this: GetImportOriginCandidateService) {
        // Using match is inefficient in a multi-switch environment, as passing `this` is a nuisance.
        switch (fileSource.type) {
          case 'file': {
            const blob = yield* await this.getFileService.getBlob(
              tournamentId,
              FileId.init(fileSource.id),
            );
            switch (blob.type) {
              case 'text/csv': {
                return ok({ type: 'csv' as const, id: fileSource.id });
              }
              case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
                const tables = yield* await this.excelClient.getTables(
                  await blob.bytes(),
                );
                return ok({
                  type: 'excel' as const,
                  id: fileSource.id,
                  tables,
                });
              }
              default:
                return yield* err(
                  new FileError(
                    `Unexpected mime type ${blob.type} for file ${fileSource.id}. Expected a csv or xlsx file.`,
                  ),
                );
            }
          }
          case 'google': {
            const metadata = yield* await this.googleSheetClient.getMetaData(
              fileSource.id,
            );
            const tables = metadata.sheets.flatMap((sheet, sheetIndex) =>
              sheet.tables.map((table) => ({
                id: table.tableId,
                name: table.name,
                sheet: {
                  index: sheetIndex,
                  name: sheet.properties.title,
                },
              })),
            );
            return ok({
              type: 'google-sheets' as const,
              id: fileSource.id,
              tables,
            });
          }
          default: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const unreachable: never = fileSource;
            throw new Error('Unexpected file type', { cause: fileSource });
          }
        }
      }.bind(this),
    );
  }
}
