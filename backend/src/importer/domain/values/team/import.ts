import { integerSchema } from 'src/lib/integer';
import * as v from 'valibot';

export const SpeakerImport = v.object({
  id: v.optional(integerSchema),
  institution: v.nullable(v.string()),
  name: v.string(),
  categories: v.array(v.string()),
  anonymous: v.optional(v.boolean()),
  email: v.optional(v.nullable(v.string())),
  labels: v.optional(v.array(v.string())),
});

export type SpeakerImport = v.InferOutput<typeof SpeakerImport>;

export const TeamImport = v.object({
  id: v.optional(integerSchema),
  speakers: v.array(SpeakerImport),
  institution: v.nullable(v.string()),
  reference: v.string(),
  shortReference: v.optional(v.string()),
  institutionConflicts: v.optional(v.array(v.string())),
  breakCategories: v.array(v.string()),
  emoji: v.optional(v.nullable(v.string())),
  codeName: v.optional(v.string()),
  useInstitutionPrefix: v.optional(v.boolean()),
  labels: v.optional(v.array(v.string())),
});

export type TeamImport = v.InferOutput<typeof TeamImport>;
