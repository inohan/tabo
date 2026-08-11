import * as v from 'valibot';
import {
  doubleDashAsNull,
  InstitutionCode,
  splitByDelimiter,
  StringBoolean,
  nullish,
} from './shared';
import { err, ok, Result } from 'neverthrow';
import { ParseFailedError } from '@shared/domain/error';
import { AdjudicatorImport, CellValue } from '@importer/domain/values';

const parseAdjudicatorSchema = (delimiter: string) =>
  v.pipe(
    v.object({
      id: nullish(v.pipe(v.number(), v.integer())),
      name: v.string(),
      email: nullish(doubleDashAsNull(v.pipe(v.string(), v.email()))),
      adjCore: nullish(StringBoolean),
      independent: nullish(StringBoolean),
      institution: v.nullable(doubleDashAsNull(InstitutionCode)),
      institutionConflicts: v.pipe(
        v.nullish(
          doubleDashAsNull(
            v.pipe(
              v.string(),
              splitByDelimiter(delimiter),
              v.array(InstitutionCode),
            ),
            (): string[] => [],
          ),
          () => null,
        ),
        v.transform((input) => (input === null ? [] : input)),
      ),
      baseScore: nullish(v.number()),
      labels: v.optional(
        v.pipe(v.nullable(v.string(), ''), splitByDelimiter(delimiter)),
      ),
    }),
  );

export const parseAdjudicatorImportRow = (
  data: Record<string, CellValue>,
  options?: {
    delimiter?: string;
  },
): Result<
  AdjudicatorImport,
  ParseFailedError<ReturnType<typeof parseAdjudicatorSchema>>
> => {
  const parsed = v.safeParse(
    parseAdjudicatorSchema(options?.delimiter ?? ','),
    data,
  );
  if (!parsed.success) {
    return err(
      ParseFailedError.fromIssue<ReturnType<typeof parseAdjudicatorSchema>>(
        parsed.issues,
      ),
    );
  }
  return ok(parsed.output);
};
