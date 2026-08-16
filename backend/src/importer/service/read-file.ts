import { GoogleSheetsClient } from '../clients/google-sheet';
import { ImportOrigin } from '../domain/values';
import { match, P } from 'ts-pattern';
import { err } from 'neverthrow';
import { AuthError } from '@shared/domain';
import { google } from 'googleapis';
import { GoogleSheetsImportFileReader } from '../infrastructure/reader';
import { throw_ } from 'src/lib/throw';
import { ImportCredentials } from '@importer/domain/values/import-credentials';

export class ReadFileService {
  async read(origin: ImportOrigin, credentials: ImportCredentials) {
    return match(origin)
      .with({ type: 'google-sheets' }, async (origin) => {
        const auth = match(credentials)
          .with({ type: 'google', accessToken: P.string }, (credentials) => {
            const auth = new google.auth.OAuth2();
            auth.setCredentials({
              access_token: credentials.accessToken,
            });
            return auth;
          })
          .with({ type: 'google', auth: P.nonNullable }, ({ auth }) => auth)
          .otherwise(() => undefined);
        if (!auth) {
          return err(new AuthError('Auth for google not provided'));
        }
        const sheetsClient = new GoogleSheetsClient(auth);
        const reader = new GoogleSheetsImportFileReader(
          origin.id,
          origin.tableId,
          sheetsClient,
        );
        return await reader.read();
      })
      .otherwise(() => throw_(new Error('Not implemented')));
  }
}
