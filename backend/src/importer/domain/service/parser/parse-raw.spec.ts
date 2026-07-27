import { expectErrResult, expectOkResult } from 'test/lib/expect-result';
import { parseRawTable } from './parse-raw';

describe('Import table parser', () => {
  test('unequal column numbers raises error', () => {
    const results = parseRawTable(['a', 'b', 'c'], [['1', '2']]);
    expect(results.length).toBe(1);
    const err = expectErrResult(results[0]);
    expect(err.message).toContain('unequal number');
  });

  test('duplicate headers raises error', () => {
    const results = parseRawTable(['a', 'b', 'a'], [['1', '2', '3']]);
    expect(results.length).toBe(1);
    const err = expectErrResult(results[0]);
    console.log(err.cause);
    expect(Object.keys(err.cause.nested!).sort()).toEqual(
      ['headers.0', 'headers.2'].sort(),
    );
  });

  test('empty rows get deleted', () => {
    const results = parseRawTable(['a', 'b', ''], [['1', '2', '3']]);
    expect(results.length).toBe(1);
    const ok = expectOkResult(results[0]);
    expect(ok).toStrictEqual({ a: '1', b: '2' });
  });

  test('multiple empty rows do not throw error', () => {
    const results = parseRawTable(
      ['a', 'b', '', '', 'c'],
      [['1', '2', '3', '4', '5']],
    );
    expect(results.length).toBe(1);
    const ok = expectOkResult(results[0]);
    expect(ok).toStrictEqual({ a: '1', b: '2', c: '5' });
  });

  test('empty cells become null instead of empty string', () => {
    const results = parseRawTable(['a', 'b'], [['1', '']]);
    expect(results.length).toBe(1);
    const ok = expectOkResult(results[0]);
    expect(ok).toStrictEqual({ a: '1', b: null });
  });

  test('headers get converted to camelCase', () => {
    const results = parseRawTable(
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
    );
    expect(results.length).toBe(1);
    const ok = expectOkResult(results[0]);
    expect(ok).toStrictEqual({
      camelCase: 'camelCase',
      snakeCase: 'snakeCase',
      pascalCase: 'pascalCase',
      kebabCase: 'kebabCase',
      spacingCase: 'spacingCase',
      spacing2Case: 'spacing2Case',
    });
  });

  test('headers with the same camelCase naming raises error', () => {
    const results = parseRawTable(['snake_case', 'snakeCase'], [['1', '2']]);
    expect(results.length).toBe(1);
    const err = expectErrResult(results[0]);
    expect(Object.keys(err.cause.nested!).sort()).toEqual(
      ['headers.0', 'headers.1'].sort(),
    );
  });
});
