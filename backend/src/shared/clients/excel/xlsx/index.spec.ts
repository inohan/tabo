import { readFile } from 'node:fs/promises';
import { XlsxWorkbook } from './workbook';

const fixture = async () =>
  new Uint8Array((await readFile('./test/data/test-excel.xlsx')).buffer);

const getWorkbook = async () => XlsxWorkbook.open(await fixture());

describe('Sheets', () => {
  test('Sheets are listed in tab order', async () => {
    const workbook = await getWorkbook();
    const sheets = workbook.getSheets();
    expect(sheets.length).toBe(2);
    expect(sheets[0]!.name).toBe('table_sheet');
    expect(sheets[1]!.name).toBe('table_types');
  });

  test('Sheets can be retreived by their name', async () => {
    const workbook = await getWorkbook();
    const sheet1 = workbook.getSheet('table_sheet');
    expect(sheet1).toBeDefined();
    const sheet2 = workbook.getSheet('table_types');
    expect(sheet2).toBeDefined();
  });
});

describe('Tables', () => {
  test('Table can be read per sheet', async () => {
    const workbook = await getWorkbook();
    const sheet1Tables = workbook.getSheet('table_sheet')!.getTables();
    expect(sheet1Tables.length).toBe(1);
    const sheet2Tables = workbook.getSheet('table_types')!.getTables();
    expect(sheet2Tables.length).toBe(0);
  });

  test('Tables can be retreived by their name', async () => {
    const workbook = await getWorkbook();
    const table = workbook.getTable('テーブル1');
    expect(table).toBeDefined();
  });

  test('Table data is correct and does not include summary row', async () => {
    const workbook = await getWorkbook();
    const table = workbook.getTable('テーブル1')!;
    expect(table.name).toBe('テーブル1');
    expect(table.sheetName).toBe('table_sheet');
    expect(table.headers).toEqual([
      'reference',
      'break_categories',
      'institutions',
      'speaker 1 name',
      'speaker 1 email',
      'speaker 1 categories',
      'speaker 2 name',
      'speaker 2 categories',
    ]);
    const data = table.rows;
    expect(data.length).toBe(4);
    expect(data[0]!).toEqual([
      'Team A',
      'open',
      'Institution A',
      'Speaker A1',
      'speakera1@example.com',
      'open',
      'Speaker A2',
      'open',
    ]);
  });
});

describe('Range retreival', () => {
  test('Cells can be retreived by specifying their position in A1 notation', async () => {
    const workbook = await getWorkbook();
    const sheet1 = workbook.getSheet('table_sheet')!;
    expect(sheet1.getCell('A1')).toBe('reference');
    expect(sheet1.getCell('A2')).toBe('Team A');
    expect(sheet1.getCell('B1')).toBe('break_categories');
    expect(sheet1.getCell('AA1')).toBe(null);
  });

  test('Cells can be retreived by specifying their position in CellRef notation', async () => {
    const workbook = await getWorkbook();
    const sheet1 = workbook.getSheet('table_sheet')!;
    expect(sheet1.getCell({ row: 1, col: 1 })).toBe('reference');
    expect(sheet1.getCell({ row: 2, col: 1 })).toBe('Team A');
    expect(sheet1.getCell({ row: 1, col: 2 })).toBe('break_categories');
  });

  test('Cell range can be retreived by specifying their range in A1:B2 notation', async () => {
    const workbook = await getWorkbook();
    const sheet1 = workbook.getSheet('table_sheet')!;
    const range1 = sheet1.getRange('A1:C2');
    expect(range1.length).toBe(2);
    expect(range1[0]!.length).toBe(3);
    expect(range1[1]!.length).toBe(3);
    expect(range1[0]![0]!).toBe('reference');
    expect(range1[0]![1]!).toBe('break_categories');
    expect(range1[0]![2]!).toBe('institutions');
    expect(range1[1]![0]!).toBe('Team A');
    expect(range1[1]![1]!).toBe('open');
    expect(range1[1]![2]!).toBe('Institution A');
  });

  test('Cell range can be retreived by specifying their range in RangeRef notation', async () => {
    const workbook = await getWorkbook();
    const sheet1 = workbook.getSheet('table_sheet')!;
    const range1 = sheet1.getRange({
      start: { col: 1, row: 1 },
      end: { col: 3, row: 2 },
    });
    expect(range1.length).toBe(2);
    expect(range1[0]!.length).toBe(3);
    expect(range1[1]!.length).toBe(3);
    expect(range1[0]![0]!).toBe('reference');
    expect(range1[0]![1]!).toBe('break_categories');
    expect(range1[0]![2]!).toBe('institutions');
    expect(range1[1]![0]!).toBe('Team A');
    expect(range1[1]![1]!).toBe('open');
    expect(range1[1]![2]!).toBe('Institution A');
  });
});

describe('Cell value formatting', async () => {
  const workbook = await getWorkbook();
  const tableSheet = workbook.getSheet('table_sheet')!;
  const tableTypeSheet = workbook.getSheet('table_types')!;
  test('Regular strings', () => {
    expect(tableTypeSheet.getCell('A7')).toBe('english');
    expect(tableTypeSheet.getCell('A5')).toBe('日本語');
  });

  test('Numbers', () => {
    expect(tableTypeSheet.getCell('A6')).toBe(0);
  });

  test('Booleans', () => {
    expect(tableTypeSheet.getCell('A1')).toBe(true);
    expect(tableTypeSheet.getCell('A2')).toBe(false);
  });

  test('Empty', () => {
    expect(tableTypeSheet.getCell('A11')).toBeNull();
  });

  test('Date', () => {
    expect(tableTypeSheet.getCell('A4')).toBeInstanceOf(Date);
    const date = tableTypeSheet.getCell('A4') as Date;
    expect(date.getUTCFullYear()).toBe(2025);
    expect(date.getUTCMonth()).toBe(1);
    expect(date.getUTCDate()).toBe(1);
  });

  test('Styled', () => {
    expect(tableTypeSheet.getCell('A10')).toBe('styled');
    expect(tableSheet.getCell('A5')).toBe('Team D');
    expect(tableSheet.getCell('A6')).toBe(4);
  });

  test('Merged values; only the top-left cell preserves value', () => {
    expect(tableTypeSheet.getCell('A8')).toBe('merged');
    expect(tableTypeSheet.getCell('A9')).toBeNull();
  });

  test('Hyperlink', () => {
    expect(tableSheet.getCell('E2')).toBe('speakera1@example.com');
  });

  test('Equation', () => {
    expect(tableSheet.getCell('B2')).toBe('open');
    expect(tableSheet.getCell('B3')).toBe('open, esl');
  });

  test('Error resolves to null', () => {
    expect(tableTypeSheet.getCell('A3')).toBe(null);
  });
});
