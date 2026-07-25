import { expectErrResult, expectOkResult } from 'test/lib/expect-result';
import { parseRawTable } from './parse-raw';

describe('Import table parser', () => {
  test('unequal column numbers raises error', () => {
    const err = expectErrResult(
      parseRawTable(
        ['a', 'b', 'c'],
        [
          ['1', '2'],
          ['3', '4', '5'],
          ['6', '7', '8'],
        ],
      ),
    );
    expect(err.message).toContain('unequal number');
  });

  test('duplicate headers raises error', () => {
    const err = expectErrResult(
      parseRawTable(
        ['a', 'b', 'a'],
        [
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
        ],
      ),
    );
    console.log(err.cause);
    expect(Object.keys(err.cause.nested!).sort()).toEqual(
      ['headers.0', 'headers.2'].sort(),
    );
  });

  test('empty rows get deleted', () => {
    const ok = expectOkResult(parseRawTable(['a', 'b', ''], [['1', '2', '3']]));
    expect(ok.length).toBe(1);
    expect(ok[0]).toStrictEqual({ a: '1', b: '2' });
  });

  test('multiple empty rows do not throw error', () => {
    const ok = expectOkResult(
      parseRawTable(['a', 'b', '', '', 'c'], [['1', '2', '3', '4', '5']]),
    );
    expect(ok.length).toBe(1);
    expect(ok[0]).toStrictEqual({ a: '1', b: '2', c: '5' });
  });

  test('empty cells become null instead of empty string', () => {
    const ok = expectOkResult(parseRawTable(['a', 'b'], [['1', '']]));
    expect(ok.length).toBe(1);
    expect(ok[0]).toStrictEqual({ a: '1', b: null });
  });

  test('headers get converted to camelCase', () => {
    const ok = expectOkResult(
      parseRawTable(
        [
          'CamelCase',
          'snake_case',
          'pascalCase',
          'kebab-case',
          'spacing case',
          'spacing 2 case',
        ],
        [
          [
            'camelCase',
            'snakeCase',
            'pascalCase',
            'kebabCase',
            'spacingCase',
            'spacing2Case',
          ],
        ],
      ),
    );
    expect(ok.length).toBe(1);
    expect(ok[0]).toStrictEqual({
      camelCase: 'camelCase',
      snakeCase: 'snakeCase',
      pascalCase: 'pascalCase',
      kebabCase: 'kebabCase',
      spacingCase: 'spacingCase',
      spacing2Case: 'spacing2Case',
    });
  });

  test('headers with the same camelCase naming raises error', () => {
    const err = expectErrResult(
      parseRawTable(['snake_case', 'snakeCase'], [['1', '2']]),
    );
    expect(Object.keys(err.cause.nested!).sort()).toEqual(
      ['headers.0', 'headers.1'].sort(),
    );
  });
});
