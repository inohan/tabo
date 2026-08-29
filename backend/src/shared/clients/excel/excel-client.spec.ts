import { readFile } from 'node:fs/promises';
import { unzipSync } from 'fflate';
import { ExcelClient } from './excel-client';
import { expectErrResult, expectOkResult } from 'test/lib/expect-result';
import { FileError } from '@shared/domain';

const fixture = async () =>
  new Uint8Array((await readFile('./test/data/test-excel.xlsx')).buffer);

const client = new ExcelClient();

const openFixture = async () =>
  expectOkResult(await client.open(await fixture()));

describe('reading test-excel.xlsx', () => {
  test('Sheets are listed in tab order', async () => {
    const workbook = await openFixture();
    expect(workbook.getSheets().map((sheet) => sheet.name)).toEqual([
      'table_sheet',
      'table_types',
    ]);
  });

  test('Table number and metadata is correct', async () => {
    const workbook = await openFixture();
    const tables = workbook.getTables();
    expect(tables.length).toBe(1);
    expect(tables[0]!.name).toBe('テーブル1');
    expect(tables[0]!.sheetName).toBe('table_sheet');
  });

  test('Table columns come from the table definition', async () => {
    const table = (await openFixture()).getTable('テーブル1');
    expect(table!.headers).toEqual([
      'reference',
      'break_categories',
      'institutions',
      'speaker 1 name',
      'speaker 1 email',
      'speaker 1 categories',
      'speaker 2 name',
      'speaker 2 categories',
    ]);
    expect(table!.rows.length).toBe(4);
  });

  test('Header row is excluded and blank cells become null', async () => {
    const table = (await openFixture()).getTable('テーブル1');
    expect(table!.rows[0]).toEqual([
      'Team A',
      'open',
      'Institution A',
      'Speaker A1',
      'speakera1@example.com',
      'open',
      'Speaker A2',
      'open',
    ]);
    // The institutions column is empty from the second team onwards.
    expect(table!.rows[1]![2]).toBeNull();
  });

  test('A cached formula result is read instead of the formula', async () => {
    const table = (await openFixture()).getTable('テーブル1');
    expect(table!.rows.map((row) => row[1])).toEqual([
      'open',
      'open, esl',
      'open',
      'open, esl',
    ]);
  });

  test('A cell of mixed formatting is read as one string', async () => {
    const table = (await openFixture()).getTable('テーブル1');
    expect(table!.rows[3]![0]).toBe('Team D');
  });

  test('An unknown table name is undefined', async () => {
    expect((await openFixture()).getTable('no-such-table')).toBeUndefined();
  });
});

describe('cell types', () => {
  test('Each type decodes to its primitive', async () => {
    const sheet = (await openFixture()).getSheet('table_types');
    expect(sheet!.getRange('A1:A5')).toEqual([
      [true],
      [false],
      // #DIV/0! has no usable value and reads as blank.
      [null],
      [new Date(Date.UTC(2025, 1, 1))],
      ['日本語'],
    ]);
  });

  test('A single reference reads one cell', async () => {
    const sheet = (await openFixture()).getSheet('table_types');
    expect(sheet!.getCell('A5')).toBe('日本語');
    expect(sheet!.getRange('A5')).toEqual([['日本語']]);
  });

  test('A range beyond the used area pads with null', async () => {
    const sheet = (await openFixture()).getSheet('table_types');
    expect(sheet!.getRange('A5:C6')).toEqual([
      ['日本語', null, null],
      [0, null, null],
    ]);
  });
});

describe('writing', () => {
  const addColumn = async () => {
    const workbook = await openFixture();
    workbook
      .getTable('テーブル1')!
      .addColumn('import_status', ['ok', 42, true, null]);
    return workbook.toBytes();
  };

  test('An added column reads back after a round trip', async () => {
    const reopened = expectOkResult(await client.open(await addColumn()));
    const table = reopened.getTable('テーブル1')!;

    expect(table.headers.at(-1)).toBe('import_status');
    expect(table.headers.length).toBe(9);
    expect(table.rows.map((row) => row.at(-1))).toEqual(['ok', 42, true, null]);
  });

  test('Existing columns are unchanged by a write', async () => {
    const original = (await openFixture()).getTable('テーブル1')!;
    const before = original.rows.map((row) => row.slice(0, 8));

    const reopened = expectOkResult(await client.open(await addColumn()));
    const after = reopened
      .getTable('テーブル1')!
      .rows.map((row) => row.slice(0, 8));

    expect(after).toEqual(before);
    expect(reopened.getSheets().map((sheet) => sheet.name)).toEqual([
      'table_sheet',
      'table_types',
    ]);
  });

  test('Only the table and its sheet are rewritten', async () => {
    const before = unzipSync(await fixture());
    const after = unzipSync(await addColumn());

    const mutated = new Set([
      'xl/tables/table1.xml',
      'xl/worksheets/sheet1.xml',
    ]);
    expect(Object.keys(after).sort()).toEqual(Object.keys(before).sort());

    for (const [name, bytes] of Object.entries(before)) {
      if (mutated.has(name)) continue;
      // Everything this client does not model - styles, themes, the second
      // sheet, shared strings - must survive a write byte for byte.
      expect({ name, bytes: after[name] }).toEqual({ name, bytes });
    }
  });

  test('A duplicate column name is rejected', async () => {
    const workbook = await openFixture();
    expect(() =>
      workbook.getTable('テーブル1')!.addColumn('reference', []),
    ).toThrow(/already has a column named/);
  });
});

describe('invalid input', () => {
  test('Bytes that are not a zip are a FileError', async () => {
    const result = await client.open(new TextEncoder().encode('not xlsx'));
    expectErrResult(result, FileError);
  });

  test('A zip that is not an xlsx package is a FileError', async () => {
    // A minimal, valid, empty zip archive.
    const emptyZip = new Uint8Array([
      0x50, 0x4b, 0x05, 0x06, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ]);
    expectErrResult(await client.open(emptyZip), FileError);
  });
});
