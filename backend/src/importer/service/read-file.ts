import { GoogleSheetsClient } from '../clients/google-sheet';
import { ImportOrigin } from '../domain/values';
import { match, P } from 'ts-pattern';
import { OAuth2Client, GoogleAuth } from 'google-auth-library';
import { err } from 'neverthrow';
import { AuthError } from '@shared/domain';
import { google } from 'googleapis';
import { GoogleSheetsImportFileReader } from '../infrastructure/reader';
import { throw_ } from 'src/lib/throw';

export class ReadFileService {
  constructor(
    private origin: ImportOrigin,
    private options?: {
      auth?: OAuth2Client | GoogleAuth;
      accessToken?: string;
    },
  ) {}

  async read() {
    return match(this.origin)
      .with({ type: 'google-sheets' }, async (origin) => {
        const auth = match(this.options)
          .with({ auth: P.nonNullable }, ({ auth }) => auth)
          .with({ accessToken: P.string }, ({ accessToken }) => {
            const auth = new google.auth.OAuth2();
            auth.setCredentials({
              access_token: accessToken,
            });
            return auth;
          })
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
