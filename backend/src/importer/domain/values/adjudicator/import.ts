import { integerSchema } from 'src/lib/integer';
import * as v from 'valibot';

export const AdjudicatorImport = v.object({
  id: v.optional(integerSchema),
  name: v.string(),
  email: v.optional(v.nullable(v.string())),
  institution: v.nullable(v.string()),
  adjCore: v.optional(v.boolean()),
  independent: v.optional(v.boolean()),
  institutionConflicts: v.optional(v.array(v.string())),
});

export type AdjudicatorImport = v.InferOutput<typeof AdjudicatorImport>;
