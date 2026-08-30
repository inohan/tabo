import { google } from 'googleapis';
import { expectOkResult } from 'test/lib/expect-result';
import { GoogleSheetsClient } from './google-sheet';
import { CellValue } from '@importer/domain/values';

const SPREADSHEET_ID = '1oEDvYQbZnUwH9dQyDb2X5dO9Kwww7yoWpzSKd0Z26BQ';
const SHEET_NAME = 'test_import_debaters';
const TABLE_NAME = 'Debaters';

const generateAuth = () =>
  new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
const client = new GoogleSheetsClient();

describe('Integration test', () => {
  test('Metadata returns properly', async () => {
    const ok = expectOkResult(
      await client.getMetaData({
        spreadsheetId: SPREADSHEET_ID,
        auth: generateAuth(),
      }),
    );
    expect(ok.spreadsheetId).toBe(SPREADSHEET_ID);
    expect(ok.properties.title).toBe('test_upload');
    const debatersSheet = ok.sheets.find(
      (sheet) => sheet.properties.title === SHEET_NAME,
    );
    expect(debatersSheet).not.toBe(undefined);
    expect(debatersSheet?.tables.length).toBe(1);
    const debaterTable = debatersSheet!.tables[0]!;
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
    const metadata = expectOkResult(
      await client.getMetaData({
        spreadsheetId: SPREADSHEET_ID,
        auth: generateAuth(),
      }),
    );
    const debaterTable = metadata.sheets
      .find((sheet) => sheet.properties.title === SHEET_NAME)!
      .tables.find((table) => table.name === TABLE_NAME)!;
    expect(debaterTable).not.toBe(undefined);
    const tableData = expectOkResult(
      await client.readTable({
        spreadsheetId: SPREADSHEET_ID,
        tableId: debaterTable.tableId,
        auth: generateAuth(),
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

  test('Retreiving a range with empty trailing values keeps its shape', async () => {
    const cells = expectOkResult(
      await client.readRange({
        spreadsheetId: SPREADSHEET_ID,
        range: 'test_values!B1:C2',
        auth: generateAuth(),
      }),
    );
    expect(cells.length).toBe(2);
    cells.forEach((row) => {
      expect(row.length).toBe(2);
      row.forEach((cell) => {
        expect(cell).toBe(null);
      });
    });
  });
});

describe('Checking data values', () => {
  let values: CellValue[];

  test('test_values sheet can be retreived', async () => {
    values = expectOkResult(
      await client.readRange({
        spreadsheetId: SPREADSHEET_ID,
        range: 'test_values!A1:A16',
        auth: generateAuth(),
      }),
    ).map((row) => row[0]!);
  });

  test('Text', () => {
    expect(values[0]!).toBe('abc');
    expect(values[1]!).toBe('日本語');
  });

  test('Numbers', () => {
    expect(values[2]!).toBe(1);
    expect(values[3]!).toBe(0.5);
  });

  test('Merged cells', () => {
    expect(values[4]!).toBe('merged');
    expect(values[5]!).toBeNull();
  });

  test('Styled cells', () => {
    expect(values[6]!).toBe('styled cell');
  });

  test('Booleans', () => {
    expect(values[7]!).toBe(true);
    expect(values[8]!).toBe(false);
  });

  test('Dates are parsed as string, as they are displayed', () => {
    expect(values[9]!).toBe('2026/2/1');
    expect(values[10]!).toBe('2/1/2025 18:30');
    expect(values[11]!).toBe('8/15');
  });

  test('Hyperlinks', () => {
    expect(values[12]!).toBe('someone@example.com');
  });

  test('Empty cell', () => {
    expect(values[13]!).toBeNull();
  });

  test('Formulas', () => {
    expect(values[14]!).toBe(1.5);
  });

  test('Errors', () => {
    expect(values[15]!).toBe('#DIV/0!');
  });
});
