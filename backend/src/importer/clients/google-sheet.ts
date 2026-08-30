import { google, sheets_v4 } from 'googleapis';
import { OAuth2Client, GoogleAuth } from 'google-auth-library';
import { err, ok, Result, safeTry } from 'neverthrow';
import * as v from 'valibot';
import { NotFoundError, ParseFailedError } from '@shared/domain/error';
import { integerSchema } from 'src/lib/integer';
import { CellValue } from '@importer/domain/values';

type Auth = OAuth2Client | GoogleAuth;

const ValuesSchema = v.undefinedable(
  v.array(
    v.array(
      v.union(
        [
          // null
          v.null(),
          // "" -> null
          v.pipe(
            v.literal(''),
            v.transform(() => null),
          ),
          // boolean
          v.pipe(
            v.literal('TRUE'),
            v.transform(() => true),
          ),
          v.pipe(
            v.literal('FALSE'),
            v.transform(() => false),
          ),
          // numbers
          v.pipe(v.string(), v.toNumber()),
          //fallback
          v.string(),
        ],
        `A cell expects either a string, boolean, or a number.`,
      ),
    ),
  ),
  () => [],
);

const SpreadsheetMetaData = v.object({
  spreadsheetId: v.string(),
  properties: v.object({
    title: v.string(),
  }),
  sheets: v.array(
    v.object({
      properties: v.object({
        title: v.string(),
        sheetId: integerSchema,
        index: integerSchema,
        gridProperties: v.object({
          rowCount: integerSchema,
          columnCount: integerSchema,
        }),
      }),
      tables: v.optional(
        v.array(
          v.object({
            tableId: v.string(),
            name: v.string(),
            range: v.object({
              sheetId: v.optional(integerSchema),
              startRowIndex: integerSchema,
              endRowIndex: integerSchema,
              startColumnIndex: integerSchema,
              endColumnIndex: integerSchema,
            }),
            columnProperties: v.array(
              v.object({
                columnName: v.string(),
                // columnType: v.picklist([
                //   'COLUMN_TYPE_UNSPECIFIED',
                //   'DOUBLE',
                //   'CURRENCY',
                //   'PERCENT',
                //   'DATE',
                //   'TIME',
                //   'DATE_TIME',
                //   'TEXT',
                //   'BOOLEAN',
                //   'DROPDOWN',
                //   'FILES_CHIP',
                //   'PEOPLE_CHIP',
                //   'FINANCE_CHIP',
                //   'PLACE_CHIP',
                //   'RATINGS_CHIP',
                // ]),
              }),
            ),
          }),
        ),
        () => [],
      ),
    }),
  ),
});

type SpreadsheetMetaData = v.InferOutput<typeof SpreadsheetMetaData>;

export class GoogleSheetsClient {
  client: sheets_v4.Sheets;
  constructor() {
    this.client = google.sheets({ version: 'v4' });
  }

  async getMetaData({
    spreadsheetId,
    auth,
  }: {
    spreadsheetId: string;
    auth: Auth;
  }): Promise<Result<SpreadsheetMetaData, NotFoundError>> {
    const res = await this.client.spreadsheets.get({
      spreadsheetId,
      fields:
        'spreadsheetId,properties(title),sheets(properties(sheetId,title,index,gridProperties),tables)',
      auth,
    });
    if (!res.ok) {
      if (res.status === 404) {
        return err(new NotFoundError('Spreadsheet not found.'));
      }
      throw new Error(`Unexpected error in Google Sheet: ${res.status}`, {
        cause: res,
      });
    }
    const parseResult = v.safeParse(SpreadsheetMetaData, res.data);
    if (!parseResult.success) {
      throw ParseFailedError.fromIssue<typeof SpreadsheetMetaData>(
        parseResult.issues,
      );
    }
    return ok(parseResult.output);
  }

  /**
   * Converts A1 notation range into a 1-indexed range object
   * @param range A1 notation range
   * @returns Indices of the start and end position. All values are 1-indexed (i.e. A1 is (1, 1))
   */
  private static getRangeSize(range: string): {
    startRowIndex: number;
    endRowIndex: number;
    startColumnIndex: number;
    endColumnIndex: number;
  } {
    const match = /(.+)!([A-Z]+)(\d+):([A-Z]+)(\d+)/.exec(range);
    if (match === null) {
      throw new Error(`Range string ${range} cannot be parsed.`);
    }
    const convCol = (alphabet: string): number => {
      return alphabet
        .split('')
        .reduce<number>((prev, cur) => prev * 26 + (cur.charCodeAt(0) - 64), 0);
    };
    return {
      startRowIndex: Number(match[3]!),
      endRowIndex: Number(match[5]!),
      startColumnIndex: convCol(match[2]!),
      endColumnIndex: convCol(match[4]!),
    };
  }

  async readRange(
    {
      spreadsheetId,
      range,
      auth,
    }: {
      spreadsheetId: string;
      range: string;
      auth: Auth;
    },
    options?: {
      /** Whether to expand trailing empty values so that the result satisfies a m×n shape. Defaults to `true` */
      fillTrailingEmptyCells?: boolean;
    },
  ): Promise<Result<CellValue[][], NotFoundError>> {
    const fillTrailingEmptyCells = options?.fillTrailingEmptyCells ?? true;
    const res = await this.client.spreadsheets.values.get({
      spreadsheetId,
      range,
      auth,
    });
    if (!res.ok) {
      if (res.status === 404) {
        return err(new NotFoundError('Spreadsheet not found.'));
      }
      throw new Error(`Unexpected error in Google Sheet: ${res.status}`);
    }
    const data = res.data;
    const values = v.safeParse(ValuesSchema, data.values);
    if (!values.success) {
      // This is not expected, so should be thrown
      throw ParseFailedError.fromIssue<typeof ValuesSchema>(values.issues);
    }
    if (fillTrailingEmptyCells) {
      const rangeObj = GoogleSheetsClient.getRangeSize(data.range!);
      return ok(
        Array.from(
          { length: rangeObj.endRowIndex - rangeObj.startRowIndex + 1 },
          (_, rowIndex) =>
            Array.from(
              {
                length: rangeObj.endColumnIndex - rangeObj.startColumnIndex + 1,
              },
              (_, colIndex) => values.output.at(rowIndex)?.at(colIndex) ?? null,
            ),
        ),
      );
    } else {
      return ok(values.output);
    }
  }

  async readTable({
    spreadsheetId,
    tableId,
    auth,
  }: {
    spreadsheetId: string;
    tableId: string;
    auth: Auth;
  }): Promise<
    Result<
      {
        headers: string[];
        data: CellValue[][];
      },
      NotFoundError
    >
  > {
    return safeTry(
      async function* (this: GoogleSheetsClient) {
        const metadata = yield* await this.getMetaData({ spreadsheetId, auth });
        const table = metadata.sheets
          .flatMap((sheet) =>
            sheet.tables.map((table) => ({
              ...table,
              sheetName: sheet.properties.title,
            })),
          )
          .find((table) => table.tableId === tableId);
        if (table === undefined) {
          return err(
            new NotFoundError(
              `Table ${tableId} does not exist in Google Sheet ${spreadsheetId}`,
            ),
          );
        }
        const range = table.range;
        const rangeString = `${table.sheetName}!R${range.startRowIndex + 2}C${range.startColumnIndex + 1}:R${range.endRowIndex}C${range.endColumnIndex}`;
        const headers = table.columnProperties.map(
          (column) => column.columnName,
        );
        const data = yield* await this.readRange({
          spreadsheetId,
          range: rangeString,
          auth,
        });
        return ok({ headers, data });
      }.bind(this),
    );
  }
}
