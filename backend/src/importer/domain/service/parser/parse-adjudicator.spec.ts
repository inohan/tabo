import { expectErrResult, expectOkResult } from 'test/lib/expect-result';
import { parseAdjudicatorImportRow } from './parse-adjudicator';
import { ParseFailedError } from '@shared/domain/error';

describe('Parsing adjudicator rows', () => {
  test('Missing fields throw error', () => {
    const err = expectErrResult(
      parseAdjudicatorImportRow({}),
      ParseFailedError,
    );
    const issues = err.cause;
    expect(issues).toHaveProperty('nested');
    expect(Object.keys(issues.nested!).sort()).toEqual(
      ['name', 'institution'].sort(),
    );
  });

  test('#1', () => {
    const ok = expectOkResult(
      parseAdjudicatorImportRow({
        name: 'Judge A',
        email: 'judge@example.com',
        adjCore: null,
        independent: null,
        institution: null,
        labels: null,
      }),
    );
    expect(ok).toEqual({
      name: 'Judge A',
      email: 'judge@example.com',
      institution: null,
      labels: [],
      institutionConflicts: [],
      adjudicatorConflicts: [],
      teamConflicts: [],
    });
  });

  test('#2', () => {
    const ok = expectOkResult(
      parseAdjudicatorImportRow({
        name: 'Judge A',
        email: 'judge@example.com',
        adjCore: 'TRUE',
        independent: null,
        institution: 'Institution A',
        labels: 'R2, R3',
      }),
    );
    expect(ok).toEqual({
      name: 'Judge A',
      email: 'judge@example.com',
      institution: 'Institution A',
      adjCore: true,
      labels: ['R2', 'R3'],
      institutionConflicts: [],
      adjudicatorConflicts: [],
      teamConflicts: [],
    });
  });
});
