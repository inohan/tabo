import { SpeakerId, TeamId } from '@shared/domain';
import { integerSchema } from 'src/lib/integer';
import * as v from 'valibot';

export const TeamImportResult = v.variant('success', [
  v.object({
    success: v.literal(true),
    teamId: v.pipe(integerSchema, v.transform(TeamId.init)),
    speakerIds: v.array(v.pipe(integerSchema, v.transform(SpeakerId.init))),
  }),
  v.object({
    success: v.literal(false),
    reason: v.string(),
  }),
]);

export type TeamImportResult = v.InferOutput<typeof TeamImportResult>;

export const TeamImportSessionFailedMissingEntities = v.object({
  type: v.literal('missing-entities'),
  institutions: v.array(
    v.object({
      code: v.string(),
      reason: v.string(),
    }),
  ),
  breakCategories: v.array(
    v.object({
      slug: v.string(),
      reason: v.string(),
    }),
  ),
  speakerCategories: v.array(
    v.object({
      slug: v.string(),
      reason: v.string(),
    }),
  ),
});

export type TeamImportSessionFailedMissingEntities = v.InferOutput<
  typeof TeamImportSessionFailedMissingEntities
>;

/**
 * Errors related to entire session failures, not per-row partial failures
 */
export const TeamImportSessionFailedDetail = v.variant('type', [
  TeamImportSessionFailedMissingEntities,
]);

export type TeamImportSessionFailedDetail = v.InferOutput<
  typeof TeamImportSessionFailedDetail
>;
