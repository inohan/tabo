import { AdjudicatorId } from '@shared/domain';
import { integerSchema } from 'src/lib/integer';
import * as v from 'valibot';

export const AdjudicatorImportResult = v.variant('success', [
  v.object({
    success: v.literal(true),
    adjudicatorId: v.pipe(integerSchema, v.transform(AdjudicatorId.init)),
  }),
  v.object({
    success: v.literal(false),
    reason: v.string(),
  }),
]);

export type AdjudicatorImportResult = v.InferOutput<
  typeof AdjudicatorImportResult
>;

export const AdjudicatorImportSessionFailedMissingEntries = v.variant('type', [
  v.object({
    type: v.literal('missing-entities'),
    institutions: v.array(
      v.object({
        code: v.string(),
        reason: v.string(),
      }),
    ),
  }),
]);

export type AdjudicatorImportSessionFailedMissingEntries = v.InferOutput<
  typeof AdjudicatorImportSessionFailedMissingEntries
>;

export const AdjudicatorImportSessionFailedDetail = v.variant('type', [
  AdjudicatorImportSessionFailedMissingEntries,
]);

export type AdjudicatorImportSessionFailedDetail = v.InferOutput<
  typeof AdjudicatorImportSessionFailedDetail
>;
