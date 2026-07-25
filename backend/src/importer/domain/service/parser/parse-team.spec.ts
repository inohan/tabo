import { groupTeamImportRow, parseGroupedTeamImportRow } from './parse-team';
import { ParseFailedError } from '@shared/domain/error';
import { expectErrResult, expectOkResult } from 'test/lib/expect-result';

describe('Grouping teams', () => {
  test('Blank speakers get excluded', () => {
    const ok = expectOkResult(
      groupTeamImportRow({
        randomField1: 'a',
        randomField2: 'b',
        speaker1Name: 'Speaker 1',
        speaker1Email: 'speaker1@gmail.com',
        speaker1Categories: 'open, esl',
        speaker2Name: 'Speaker 2',
        speaker2Categories: 'open',
        speaker3Name: null,
        speaker3Category: null,
        speaker4Random: 'randommm',
      }),
    );
    expect(ok).toStrictEqual({
      randomField1: 'a',
      randomField2: 'b',
      speakers: [
        {
          name: 'Speaker 1',
          email: 'speaker1@gmail.com',
          categories: 'open, esl',
        },
        {
          name: 'Speaker 2',
          categories: 'open',
        },
      ],
    });
  });
});

describe('Parsing team rows', () => {
  test('Missing team fields raise error, and the error contents are included', () => {
    const err = expectErrResult(
      parseGroupedTeamImportRow({
        speakers: [
          {
            name: 'Speaker 1',
            categories: 'open',
            institution: 'Institution A',
          },
        ],
      }),
      ParseFailedError,
    );
    const issues = err.cause;
    expect(issues).toHaveProperty('nested');
    expect(Object.keys(issues.nested!).sort()).toEqual(
      ['reference', 'breakCategories'].sort(),
    );
  });

  test('Missing speaker fields raise error, and the error contents are included', () => {
    const err = expectErrResult(
      parseGroupedTeamImportRow({
        speakers: [{}],
        reference: 'Team A',
        breakCategories: 'open',
        institution: 'Institution A',
      }),
      ParseFailedError,
    );
    const issues = err.cause;
    expect(issues).toHaveProperty('nested');
    expect(Object.keys(issues.nested!).sort()).toEqual(
      ['speakers.0.name', 'speakers.0.categories'].sort(),
    );
  });

  test('Non-all-or-none speaker institutions raise error', () => {
    const err = expectErrResult(
      parseGroupedTeamImportRow({
        reference: 'Team A',
        institution: null,
        breakCategories: 'open',
        speakers: [
          {
            name: 'Speaker A1',
            categories: 'open',
            institution: 'Johto',
          },
          {
            name: 'Speaker A2',
            categories: 'open',
          },
        ],
      }),
      ParseFailedError,
    );
    expect(err.message).toContain('all-or-none');
  });

  test('Missing team and speaker institutions raise error', () => {
    const err = expectErrResult(
      parseGroupedTeamImportRow({
        reference: 'Team A',
        breakCategories: 'open',
        speakers: [
          {
            name: 'Speaker A1',
            categories: 'open',
          },
          {
            name: 'Speaker A2',
            categories: 'open',
          },
        ],
      }),
      ParseFailedError,
    );
    expect(err.message).toContain(
      'An institution must be present either in the team or all speakers.',
    );
  });

  test('Institution mismatch between team and speaker raises error', () => {
    const err = expectErrResult(
      parseGroupedTeamImportRow({
        reference: 'Team A',
        breakCategories: 'open',
        institution: 'Institution A',
        speakers: [
          {
            name: 'Speaker A1',
            categories: 'open',
            institution: 'Institution A',
          },
          {
            name: 'Speaker A2',
            categories: 'open',
            institution: null,
          },
        ],
      }),
      ParseFailedError,
    );
    expect(err.message).toContain(
      "The team's institution and speakers' institutions do not match",
    );
  });

  test('Blank break category parses correctly', () => {
    const ok = expectOkResult(
      parseGroupedTeamImportRow({
        reference: 'Team A',
        institution: 'Johto',
        breakCategories: null,
        speakers: [
          {
            name: 'Speaker A1',
            categories: 'open',
          },
        ],
      }),
    );
    expect(ok).toEqual({
      reference: 'Team A',
      institution: 'Johto',
      breakCategories: [],
      speakers: [
        {
          name: 'Speaker A1',
          categories: ['open'],
          institution: 'Johto',
        },
      ],
    });
  });

  test('Blank speaker category parses correctly', () => {
    const ok = expectOkResult(
      parseGroupedTeamImportRow({
        reference: 'Team A',
        institution: 'Johto',
        breakCategories: 'open',
        speakers: [
          {
            name: 'Speaker A1',
            categories: null,
          },
        ],
      }),
    );
    expect(ok).toEqual({
      reference: 'Team A',
      institution: 'Johto',
      breakCategories: ['open'],
      speakers: [
        {
          name: 'Speaker A1',
          categories: [],
          institution: 'Johto',
        },
      ],
    });
  });

  test('Team institution propagates to speaker institutions', () => {
    const ok = expectOkResult(
      parseGroupedTeamImportRow({
        reference: 'Team A',
        institution: 'Johto',
        breakCategories: 'open',
        speakers: [
          {
            name: 'Speaker A1',
            categories: 'open',
          },
          {
            name: 'Speaker A2',
            categories: 'open',
          },
        ],
      }),
    );
    expect(ok.speakers[0].institution).toBe('Johto');
    expect(ok.speakers[0].institution).toBe('Johto');
  });

  test('Speaker institution propagates to team institutions', () => {
    const ok = expectOkResult(
      parseGroupedTeamImportRow({
        reference: 'Team A',
        breakCategories: 'open',
        speakers: [
          {
            name: 'Speaker A1',
            categories: 'open',
            institution: 'Johto',
          },
          {
            name: 'Speaker A2',
            categories: 'open',
            institution: 'Johto',
          },
        ],
      }),
    );
    expect(ok.institution).toBe('Johto');
  });

  test('Differing speaker institutions resolve to null team institution', () => {
    const ok = expectOkResult(
      parseGroupedTeamImportRow({
        reference: 'Team A',
        breakCategories: 'open',
        speakers: [
          {
            name: 'Speaker A1',
            categories: 'open',
            institution: 'Institution A',
          },
          {
            name: 'Speaker A2',
            categories: 'open',
            institution: 'Institution B',
          },
        ],
      }),
    );
    expect(ok.institution).toBe(null);
  });

  test('registerCompositeTeamInstitutionConflicts setting registers properly', () => {
    const ok = expectOkResult(
      parseGroupedTeamImportRow(
        {
          reference: 'Team A',
          breakCategories: 'open',
          speakers: [
            {
              name: 'Speaker A1',
              categories: 'open',
              institution: 'Institution A',
            },
            {
              name: 'Speaker A2',
              categories: 'open',
              institution: 'Institution B',
            },
            {
              name: 'Speaker A3',
              categories: 'open',
              institution: null,
            },
          ],
        },
        { registerCompositeTeamInstitutionConflicts: true },
      ),
    );
    expect(ok.institutionConflicts).toBeInstanceOf(Array);
    expect(ok.institutionConflicts!.sort()).toEqual(
      ['Institution A', 'Institution B'].sort(),
    );
  });

  test('registerCompositeTeamInstitutionConflicts setting does not override explicit conflicts', () => {
    const ok = expectOkResult(
      parseGroupedTeamImportRow(
        {
          reference: 'Team A',
          breakCategories: 'open',
          institutionConflicts: 'Institution A',
          speakers: [
            {
              name: 'Speaker A1',
              categories: 'open',
              institution: 'Institution A',
            },
            {
              name: 'Speaker A2',
              categories: 'open',
              institution: 'Institution B',
            },
            {
              name: 'Speaker A3',
              categories: 'open',
              institution: null,
            },
          ],
        },
        { registerCompositeTeamInstitutionConflicts: true },
      ),
    );
    expect(ok.institutionConflicts).toBeInstanceOf(Array);
    expect(ok.institutionConflicts!.sort()).toEqual(['Institution A'].sort());
  });

  test('double dash parses correctly', () => {
    const ok = expectOkResult(
      parseGroupedTeamImportRow({
        reference: '--',
        shortReference: '--',
        breakCategories: '--',
        institution: '--',
        institutionConflicts: '--',
        emoji: '--',
        codeName: '--',
        useInstitutionPrefix: '--',
        labels: '--',
        speakers: [
          {
            name: '--',
            categories: '--',
            institution: '--',
            anonymous: '--',
            email: '--',
            labels: '--',
          },
        ],
      }),
    );
    expect(ok).toStrictEqual({
      reference: '--',
      shortReference: '--',
      breakCategories: ['--'],
      institution: null,
      institutionConflicts: [],
      emoji: null,
      codeName: '--',
      useInstitutionPrefix: false,
      labels: ['--'],
      speakers: [
        {
          name: '--',
          categories: ['--'],
          institution: null,
          anonymous: false,
          email: null,
          labels: ['--'],
        },
      ],
    });
  });
});

describe('integration', () => {
  test('group + parseGroup #1: team institution only', () => {
    const grouped = expectOkResult(
      groupTeamImportRow({
        reference: 'Team name',
        institution: 'Institution A',
        breakCategories: 'open, esl',
        speaker1Name: 'Speaker 1',
        speaker1Email: 'sample@tabo.com',
        speaker1Categories: 'open, esl, efl',
        speaker2Name: 'Speaker 2',
        speaker2Categories: 'open, esl',
      }),
    );
    const ok = expectOkResult(parseGroupedTeamImportRow(grouped));
    expect(ok).toStrictEqual({
      reference: 'Team name',
      institution: 'Institution A',
      breakCategories: ['open', 'esl'],
      speakers: [
        {
          name: 'Speaker 1',
          email: 'sample@tabo.com',
          categories: ['open', 'esl', 'efl'],
          institution: 'Institution A',
        },
        {
          name: 'Speaker 2',
          categories: ['open', 'esl'],
          institution: 'Institution A',
        },
      ],
    });
  });

  test('group + parseGroup #2: speaker institution only', () => {
    const grouped = expectOkResult(
      groupTeamImportRow({
        reference: 'Team name',
        breakCategories: 'open',
        speaker1Name: 'Speaker 1',
        speaker1Email: 'sample@tabo.com',
        speaker1Institution: 'Institution A',
        speaker1Categories: 'esl, efl',
        speaker1Labels: 'Shadow, Round 1 absent',
        speaker2Name: 'Speaker 2',
        speaker2Institution: 'Institution A',
        speaker2Categories: null,
        speaker2Labels: null,
        speaker3Name: 'Speaker 3',
        speaker3Institution: 'Institution A',
        speaker3Categories: null,
        speaker4Name: null,
        speaker4Institution: null,
        speaker4Categories: null,
      }),
    );
    const ok = expectOkResult(parseGroupedTeamImportRow(grouped));
    expect(ok).toStrictEqual({
      reference: 'Team name',
      institution: 'Institution A',
      breakCategories: ['open'],
      speakers: [
        {
          name: 'Speaker 1',
          email: 'sample@tabo.com',
          categories: ['esl', 'efl'],
          institution: 'Institution A',
          labels: ['Shadow', 'Round 1 absent'],
        },
        {
          name: 'Speaker 2',
          categories: [],
          institution: 'Institution A',
          labels: [],
        },
        {
          name: 'Speaker 3',
          categories: [],
          institution: 'Institution A',
        },
      ],
    });
  });

  test('group + parseGroup #3: team institution + blank speaker institutions', () => {
    const grouped = expectOkResult(
      groupTeamImportRow({
        reference: 'Team name',
        breakCategories: 'open',
        institution: 'Institution A',
        speaker1Name: 'Speaker 1',
        speaker1Email: 'sample@tabo.com',
        speaker1Institution: null,
        speaker1Categories: 'esl, efl',
        speaker2Name: 'Speaker 2',
        speaker2Institution: null,
        speaker2Categories: null,
      }),
    );
    const ok = expectOkResult(parseGroupedTeamImportRow(grouped));
    expect(ok).toStrictEqual({
      reference: 'Team name',
      institution: 'Institution A',
      breakCategories: ['open'],
      speakers: [
        {
          name: 'Speaker 1',
          email: 'sample@tabo.com',
          categories: ['esl', 'efl'],
          institution: 'Institution A',
        },
        {
          name: 'Speaker 2',
          categories: [],
          institution: 'Institution A',
        },
      ],
    });
  });

  test('group + parseGroup #4: blank team institution + speaker institutions', () => {
    const grouped = expectOkResult(
      groupTeamImportRow({
        reference: 'Team name',
        breakCategories: 'open',
        institution: null,
        speaker1Name: 'Speaker 1',
        speaker1Email: 'sample@tabo.com',
        speaker1Institution: 'Institution A',
        speaker1Categories: 'esl, efl',
        speaker2Name: 'Speaker 2',
        speaker2Institution: 'Institution A',
        speaker2Categories: null,
      }),
    );
    const ok = expectOkResult(parseGroupedTeamImportRow(grouped));
    expect(ok).toStrictEqual({
      reference: 'Team name',
      institution: 'Institution A',
      breakCategories: ['open'],
      speakers: [
        {
          name: 'Speaker 1',
          email: 'sample@tabo.com',
          categories: ['esl', 'efl'],
          institution: 'Institution A',
        },
        {
          name: 'Speaker 2',
          categories: [],
          institution: 'Institution A',
        },
      ],
    });
  });
});
