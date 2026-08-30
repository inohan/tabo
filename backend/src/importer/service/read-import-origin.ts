import { GoogleSheetsClient } from '../clients/google-sheet';
import { ImportOrigin, TableValue } from '../domain/values';
import { match } from 'ts-pattern';
import { err, ok, safeTry } from 'neverthrow';
import {
  AuthError,
  FileError,
  FileId,
  ParseFailedError,
  TournamentId,
} from '@shared/domain';
import { google } from 'googleapis';
import { ImportCredentials } from '@importer/domain/values/import-credentials';
import { GetFileService } from '@shared/service';
import { ExcelClient } from '@shared/clients/excel';
import { CsvClient } from '@shared/clients/csv';
import { safeParse } from 'valibot';

export class ReadImportOriginService {
  constructor(
    private getFileService: GetFileService,
    private csvClient: CsvClient,
    private excelClient: ExcelClient,
    private googleSheetsClient: GoogleSheetsClient,
  ) {}

  async read(
    tournamentId: TournamentId,
    origin: ImportOrigin,
    credentials: ImportCredentials,
  ) {
    return await safeTry(
      async function* (this: ReadImportOriginService) {
        const tableData = yield* await match(origin)
          .with({ type: 'google-sheets' }, async (origin) => {
            if (credentials.type !== 'google') {
              return err(new AuthError('Auth for google not provided'));
            }
            const auth = new google.auth.OAuth2();
            auth.setCredentials({
              access_token: credentials.accessToken,
            });
            return this.googleSheetsClient.readTable({
              spreadsheetId: origin.id,
              tableId: origin.tableId,
              auth,
            });
          })
          .with(
            { type: 'csv' },
            async (origin) =>
              await safeTry(
                async function* (this: ReadImportOriginService) {
                  const blob = yield* await this.getFileService.getBlob(
                    tournamentId,
                    FileId.init(origin.id),
                  );
                  const data = yield* this.csvClient.read(await blob.bytes());
                  if (data.length < 1) {
                    return err(
                      new FileError(
                        `CSV ${origin.id} does not contain enough rows.`,
                      ),
                    );
                  }
                  return ok<TableValue>({
                    headers: data[0]!,
                    data: data.slice(1),
                  });
                }.bind(this),
              ),
          )
          .with(
            { type: 'excel' },
            async (origin) =>
              await safeTry(
                async function* (this: ReadImportOriginService) {
                  const blob = yield* await this.getFileService.getBlob(
                    tournamentId,
                    FileId.init(origin.id),
                  );
                  const table = yield* await this.excelClient.getTableValue(
                    await blob.bytes(),
                    origin.tableId,
                  );
                  return ok<TableValue>(table);
                }.bind(this),
              ),
          )
          .exhaustive();
        const parseResult = safeParse(TableValue, tableData);
        if (!parseResult.success) {
          return err(
            ParseFailedError.fromIssue<typeof TableValue>(parseResult.issues),
          );
        }
        return ok(parseResult.output);
      }.bind(this),
    );
  }
}
