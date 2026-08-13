import { integerSchema } from 'src/lib/integer';
import * as v from 'valibot';

export const AdjudicatorDuplicationReason = v.variant('type', [
  v.object({
    type: v.literal('sameName'),
    name: v.string(),
    indices: v.array(integerSchema),
  }),
  v.object({
    type: v.literal('sameMatch'),
    adjudicatorId: integerSchema,
    indices: v.array(integerSchema),
  }),
]);

export type AdjudicatorDuplicationReason = v.InferOutput<
  typeof AdjudicatorDuplicationReason
>;

export const AdjudicatorDuplicationStatus = v.variant('hasDuplicate', [
  v.object({
    hasDuplicate: v.literal(false),
  }),
  v.object({
    hasDuplicate: v.literal(true),
    reasons: v.array(AdjudicatorDuplicationReason),
  }),
]);

export type AdjudicatorDuplicationStatus = v.InferOutput<
  typeof AdjudicatorDuplicationStatus
>;

export const SerializedAdjudicatorDuplicationStatus = v.variant(
  'hasDuplicate',
  [
    v.object({
      hasDuplicate: v.literal(false),
    }),
    v.object({
      hasDuplicate: v.literal(true),
      reasons: v.array(v.string()),
    }),
  ],
);

export type SerializedAdjudicatorDuplicationStatus = v.InferOutput<
  typeof SerializedAdjudicatorDuplicationStatus
>;
