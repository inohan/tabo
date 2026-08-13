import { integerSchema } from 'src/lib/integer';
import * as v from 'valibot';

export const SpeakerMatchedBy = v.object({
  id: v.boolean(),
  name: v.boolean(),
  email: v.boolean(),
});

export type SpeakerMatchedBy = v.InferOutput<typeof SpeakerMatchedBy>;

const SpeakerMatchStatus = v.variant('existing', [
  v.object({
    existing: v.null(),
  }),
  v.object({
    existing: integerSchema,
    matchedBy: SpeakerMatchedBy,
  }),
]);

export type SpeakerMatchStatus = v.InferOutput<typeof SpeakerMatchStatus>;

export const TeamMatchedBy = v.object({
  id: v.boolean(),
  reference: v.boolean(),
  speakers: v.object({
    matched: integerSchema,
    total: integerSchema,
  }),
});

export type TeamMatchedBy = v.InferOutput<typeof TeamMatchedBy>;

export const TeamMatchStatus = v.variant('existing', [
  v.object({
    existing: v.null(),
  }),
  v.object({
    existing: integerSchema,
    matchedBy: TeamMatchedBy,
    speakers: v.array(SpeakerMatchStatus),
  }),
]);

export type TeamMatchStatus = v.InferOutput<typeof TeamMatchStatus>;
