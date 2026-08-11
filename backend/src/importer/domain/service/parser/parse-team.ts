import * as v from 'valibot';
import { CellValue, TeamImport } from '../../values';
import { err, ok, Result } from 'neverthrow';
import { ParseFailedError } from '@shared/domain/error';
import {
  BreakCategorySlug,
  doubleDashAsNull as doubleDashable,
  InstitutionCode,
  SpeakerCategorySlug,
  splitByDelimiter,
  StringBoolean,
  nullish,
} from './shared';

const TeamReference = v.pipe(v.string(), v.maxGraphemes(150));
const TeamShortReference = v.pipe(v.string(), v.maxGraphemes(35));
const TeamCodeName = v.pipe(v.string(), v.maxGraphemes(150));

const generateTeamSchema = (
  delimiter: string,
  registerCompositeTeamInstitutionConflicts: boolean,
) =>
  v.pipe(
    v.intersect([
      v.variant(
        'institution',
        [
          // Institution exists
          v.pipe(
            v.object({
              institution: doubleDashable(InstitutionCode),
              speakers: v.union(
                [
                  v.array(v.object({ institution: v.optional(v.never()) })),
                  v.array(
                    v.object({
                      institution: v.pipe(
                        v.null(),
                        v.transform(() => undefined),
                      ),
                    }),
                  ),
                  v.array(
                    v.object({
                      institution: v.nullable(doubleDashable(v.string())),
                    }),
                  ),
                ],
                'Speaker institution fields must be all-or-none',
              ),
            }),
            v.check(({ institution, speakers }) => {
              if (speakers.every((spk) => spk.institution === undefined)) {
                return true;
              }
              return (
                institution === null ||
                speakers.every((spk) => spk.institution === institution)
              );
            }, "The team's institution and speakers' institutions do not match"),
            v.transform(({ institution, speakers }) => {
              if (
                speakers.every((spk) => spk.institution === undefined) ||
                speakers.every((spk) => spk.institution === null)
              ) {
                return {
                  institution,
                  speakers: speakers.map(() => ({ institution })),
                };
              } else {
                return {
                  institution,
                  speakers,
                };
              }
            }),
          ),
          v.pipe(
            v.object({
              institution: v.null(),
              speakers: v.union(
                [
                  v.array(v.object({ institution: v.optional(v.never()) })),
                  v.array(
                    v.object({
                      institution: v.nullable(doubleDashable(InstitutionCode)),
                    }),
                  ),
                ],
                'Speaker institution fields must be all-or-none',
              ),
            }),
            v.transform(({ speakers, institution }) => {
              if (speakers.every((spk) => spk.institution === undefined)) {
                return {
                  institution,
                  speakers: speakers.map(() => ({ institution: null })),
                };
              } else {
                return {
                  institution: speakers
                    .map((spk) => spk.institution)
                    .reduce((acc, cur) => (acc === cur ? acc : null)),
                  speakers,
                };
              }
            }),
          ),
          v.pipe(
            v.object({
              institution: v.optional(v.never()),
              speakers: v.array(
                v.object(
                  {
                    institution: v.nullable(doubleDashable(InstitutionCode)),
                  },
                  'An institution must be present either in the team or all speakers.',
                ),
              ),
            }),
            v.transform(({ speakers }) => ({
              institution: speakers
                .map((spk) => spk.institution)
                .reduce((acc, cur) => (acc === cur ? acc : null)),
              speakers,
            })),
          ),
        ],
        'Error with institutions',
      ),
      v.object({
        id: nullish(v.pipe(v.number(), v.integer())),
        reference: TeamReference,
        shortReference: nullish(TeamShortReference),
        institutionConflicts: nullish(
          doubleDashable(
            v.pipe(
              v.string(),
              splitByDelimiter(delimiter),
              v.array(InstitutionCode),
            ),
            (): string[] => [],
          ),
        ),
        breakCategories: v.pipe(
          v.nullable(v.string(), ''),
          splitByDelimiter(delimiter),
          v.array(BreakCategorySlug),
        ),
        emoji: nullish(doubleDashable(v.string())),
        codeName: nullish(TeamCodeName),
        useInstitutionPrefix: nullish(StringBoolean),
        labels: v.optional(
          v.pipe(v.nullable(v.string(), ''), splitByDelimiter(delimiter)),
        ),
        speakers: v.array(
          v.object({
            id: nullish(v.pipe(v.number(), v.integer())),
            name: v.string(),
            categories: v.pipe(
              v.nullable(v.string(), ''),
              splitByDelimiter(delimiter),
              v.array(SpeakerCategorySlug),
            ),
            anonymous: nullish(StringBoolean),
            email: nullish(doubleDashable(v.pipe(v.string(), v.email()))),
            labels: v.optional(
              v.pipe(v.nullable(v.string(), ''), splitByDelimiter(delimiter)),
            ),
          }),
        ),
      }),
    ]),
    v.transform((input) => {
      if (
        !registerCompositeTeamInstitutionConflicts ||
        Array.isArray(input.institutionConflicts)
      ) {
        return input;
      }
      return {
        ...input,
        institutionConflicts: [
          ...new Set(
            input.speakers
              .map((spk) => spk.institution)
              .filter((inst) => inst !== null),
          ),
        ],
      };
    }),
  );

const GroupSpeakersSchema = v.pipe(
  v.record(
    v.string(),
    v.nullable(v.union([v.string(), v.boolean(), v.number()])),
  ),
  v.transform((input) => {
    const speakers = new Map<number, Record<string, CellValue>>();
    const rest: Record<string, CellValue> = {};
    for (const [key, value] of Object.entries(input)) {
      const m = key.match(/^speaker(\d+)([A-Z]\w*)$/);
      if (!m) {
        rest[key] = value;
        continue;
      }
      const idx = Number(m[1]);
      const field = m[2][0].toLowerCase() + m[2].slice(1);
      speakers.set(idx, { ...speakers.get(idx), [field]: value });
    }
    return {
      ...rest,
      speakers: [...speakers.entries()]
        .sort(([a], [b]) => a - b)
        .map(([, s]) => s)
        .filter((rec) => rec.name != null), //Only filter out speakers with name entered (happens when there are blank speakerXName fields)
    };
  }),
);

export const groupTeamImportRow = (
  data: Record<string, CellValue>,
): Result<
  v.InferOutput<typeof GroupSpeakersSchema>,
  ParseFailedError<typeof GroupSpeakersSchema>
> => {
  const groupResult = v.safeParse(GroupSpeakersSchema, data);
  if (!groupResult.success) {
    return err(
      ParseFailedError.fromIssue<typeof GroupSpeakersSchema>(
        groupResult.issues,
      ),
    );
  }
  return ok(groupResult.output);
};

export const parseGroupedTeamImportRow = (
  groupedData: Record<string, Record<string, CellValue>[] | CellValue>,
  options?: {
    splitDelimiter?: string;
    registerCompositeTeamInstitutionConflicts?: boolean;
  },
): Result<
  TeamImport,
  ParseFailedError<ReturnType<typeof generateTeamSchema>>
> => {
  const parseSchema = generateTeamSchema(
    options?.splitDelimiter ?? ',',
    options?.registerCompositeTeamInstitutionConflicts ?? false,
  );
  const result = v.safeParse(parseSchema, groupedData);
  if (result.success) {
    return ok(result.output as TeamImport);
  }
  return err(ParseFailedError.fromIssue<typeof parseSchema>(result.issues));
};
