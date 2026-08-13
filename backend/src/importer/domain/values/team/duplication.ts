import { integerSchema } from 'src/lib/integer';
import * as v from 'valibot';

export const TeamDuplicationReason = v.variant('type', [
  v.object({
    type: v.literal('sameReference'),
    reference: v.string(),
    indices: v.array(integerSchema),
  }),
  v.object({
    type: v.literal('sameMatch'),
    teamId: integerSchema,
    indices: v.array(integerSchema),
  }),
]);

export type TeamDuplicationReason = v.InferOutput<typeof TeamDuplicationReason>;

export const TeamDuplicationStatus = v.variant('hasDuplicate', [
  v.object({
    hasDuplicate: v.literal(false),
  }),
  v.object({
    hasDuplicate: v.literal(true),
    reasons: v.array(TeamDuplicationReason),
  }),
]);

export type TeamDuplicationStatus = v.InferOutput<typeof TeamDuplicationStatus>;

export const SerializedTeamDuplicationStatus = v.variant('hasDuplicate', [
  v.object({
    hasDuplicate: v.literal(false),
  }),
  v.object({
    hasDuplicate: v.literal(true),
    reasons: v.array(v.string()),
  }),
]);

export type SerializedTeamDuplicationStatus = v.InferOutput<
  typeof SerializedTeamDuplicationStatus
>;
