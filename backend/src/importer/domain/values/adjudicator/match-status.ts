import { integerSchema } from 'src/lib/integer';
import * as v from 'valibot';

export const AdjudicatorMatchedBy = v.object({
  id: v.boolean(),
  name: v.boolean(),
  email: v.boolean(),
});

export type AdjudicatorMatchedBy = v.InferOutput<typeof AdjudicatorMatchedBy>;

export const AdjudicatorMatchStatus = v.variant('existing', [
  v.object({
    existing: v.null(),
  }),
  v.object({
    existing: integerSchema,
    matchedBy: AdjudicatorMatchedBy,
  }),
]);

export type AdjudicatorMatchStatus = v.InferOutput<
  typeof AdjudicatorMatchStatus
>;
