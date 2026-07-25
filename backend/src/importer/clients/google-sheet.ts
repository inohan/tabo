import { google, sheets_v4 } from 'googleapis';
import { OAuth2Client, GoogleAuth } from 'google-auth-library';
import { err, ok, Result } from 'neverthrow';
import * as v from 'valibot';
import { NotFoundError, ParseFailedError } from '@shared/domain/error';

const ValuesSchema = v.array(
  v.array(
    v.union(
      [
        v.pipe(
          v.string(),
          v.transform((s) => (s !== '' ? s : null)),
        ),
        v.boolean(),
        v.number(),
      ],
      `A cell expects either a string, boolean, or a number.`,
    ),
  ),
);

type SpreadsheetMetaData = {
  spreadsheetId: string;
  properties: NonNullableDeep<
    RequiredDeep<Pick<sheets_v4.Schema$SpreadsheetProperties, 'title'>>
  >;
  sheets: {
    properties: NonNullableDeep<
      RequiredDeep<
        Pick<
          sheets_v4.Schema$SheetProperties,
          'sheetId' | 'title' | 'index' | 'gridProperties'
        >
      >
    >;
    tables: NonNullableDeep<RequiredDeep<sheets_v4.Schema$Table>>[];
  }[];
};

export class GoogleSheetsClient {
  client: sheets_v4.Sheets;
  constructor(auth: OAuth2Client | GoogleAuth) {
    this.client = google.sheets({ version: 'v4', auth });
  }

  async getMetaData(
    spreadsheetId: string,
  ): Promise<Result<SpreadsheetMetaData, NotFoundError>> {
    const res = await this.client.spreadsheets.get({
      spreadsheetId,
      fields:
        'spreadsheetId,properties(title),sheets(properties(sheetId,title,index,gridProperties),tables)',
    });
    if (!res.ok) {
      if (res.status === 404) {
        return err(new NotFoundError('Spreadsheet not found.'));
      }
      throw new Error(`Unexpected error in Google Sheet: ${res.status}`, {
        cause: res,
      });
    }
    return ok(res.data as SpreadsheetMetaData);
  }

  async readRange({
    spreadsheetId,
    range,
  }: {
    spreadsheetId: string;
    range: string;
  }): Promise<Result<(string | boolean | number | null)[][], NotFoundError>> {
    const res = await this.client.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    if (!res.ok) {
      if (res.status === 404) {
        return err(new NotFoundError('Spreadsheet not found.'));
      }
      throw new Error(`Unexpected error in Google Sheet: ${res.status}`);
    }
    const data = res.data as NonNullableDeep<
      RequiredDeep<sheets_v4.Schema$ValueRange>
    >;
    const values = v.safeParse(ValuesSchema, data.values);
    if (!values.success) {
      // This is not expected, so should be thrown
      throw ParseFailedError.fromIssue<typeof ValuesSchema>(values.issues);
    }
    return ok(values.output);
  }

  async readTable({
    spreadsheetId,
    sheetName,
    table,
  }: {
    spreadsheetId: string;
    sheetName: string;
    table: NonNullableDeep<RequiredDeep<sheets_v4.Schema$Table>>;
  }): Promise<
    Result<
      {
        headers: (string | null)[];
        data: (string | number | boolean | null)[][];
      },
      NotFoundError
    >
  > {
    const range = table.range;
    const rangeString = `${sheetName}!R${range.startRowIndex + 2}C${range.startColumnIndex + 1}:R${range.endRowIndex}C${range.endColumnIndex}`;
    const headers = table.columnProperties.map((column) => column.columnName);
    return (
      await this.readRange({ spreadsheetId, range: rangeString })
    ).andThen((data) =>
      ok({
        headers: headers,
        data: data.map((row) => {
          const originalLength = row.length;
          if (originalLength < headers.length) {
            row.length = headers.length;
          }
          row.fill(null, originalLength);
          return row;
        }),
      }),
    );
  }
}
