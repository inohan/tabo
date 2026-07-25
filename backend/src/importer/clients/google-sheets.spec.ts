import { google } from 'googleapis';
import { expectOkResult } from 'test/lib/expect-result';
import { GoogleSheetsClient } from './google-sheet';

const SPREADSHEET_ID = '1oEDvYQbZnUwH9dQyDb2X5dO9Kwww7yoWpzSKd0Z26BQ';
const SHEET_NAME = 'test_import_debaters';
const TABLE_NAME = 'Debaters';

describe('Integration test', () => {
  const generateAuth = () =>
    new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  const client = new GoogleSheetsClient(generateAuth());
  test('Metadata returns properly', async () => {
    const ok = expectOkResult(await client.getMetaData(SPREADSHEET_ID));
    expect(ok.spreadsheetId).toBe(SPREADSHEET_ID);
    expect(ok.properties.title).toBe('test_upload');
    const debatersSheet = ok.sheets.find(
      (sheet) => sheet.properties.title === SHEET_NAME,
    );
    expect(debatersSheet).not.toBe(undefined);
    expect(debatersSheet?.tables.length).toBe(1);
    const debaterTable = debatersSheet!.tables[0];
    expect(debaterTable.name).toBe(TABLE_NAME);
    expect(debaterTable.columnProperties.length).toBe(13);
    expect(
      debaterTable.range.endRowIndex - debaterTable.range.startRowIndex,
    ).toBe(8);
    expect(
      debaterTable.columnProperties.map((property) => property.columnName),
    ).toEqual([
      'reference',
      'institution',
      'break categories',
      'speaker 1 name',
      'speaker 1 email',
      'speaker 1 categories',
      'speaker 1 institution',
      'speaker 2 name',
      'speaker 2 categories',
      'speaker 2 institution',
      'speaker 3 name',
      'speaker 3 categories',
      'speaker 3 institution',
    ]);
  });

  test('Reading tables properly', async () => {
    const metadata = expectOkResult(await client.getMetaData(SPREADSHEET_ID));
    const debaterTable = metadata.sheets
      .find((sheet) => sheet.properties.title === SHEET_NAME)
      ?.tables?.find((table) => table.name === TABLE_NAME);
    expect(debaterTable).not.toBe(undefined);
    const tableData = expectOkResult(
      await client.readTable({
        spreadsheetId: SPREADSHEET_ID,
        sheetName: SHEET_NAME,
        table: debaterTable!,
      }),
    );
    expect(tableData.headers).toEqual([
      'reference',
      'institution',
      'break categories',
      'speaker 1 name',
      'speaker 1 email',
      'speaker 1 categories',
      'speaker 1 institution',
      'speaker 2 name',
      'speaker 2 categories',
      'speaker 2 institution',
      'speaker 3 name',
      'speaker 3 categories',
      'speaker 3 institution',
    ]);
    expect(tableData.data.length).toBe(7);
    expect(tableData.data.map(([reference]) => reference)).toEqual([
      'Team A',
      'Team B',
      'Team C',
      'Team D',
      'Team E',
      'Team F',
      'Team G',
    ]);
    expect(tableData.data[0]).toEqual([
      'Team A',
      'Institution A',
      'open',
      'Speaker A1',
      'examplea1@example.com',
      'open',
      null,
      'Speaker A2',
      'open',
      null,
      null,
      null,
      null,
    ]);
  });
});
