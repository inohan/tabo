import * as v from 'valibot';

export const AdjudicatorUpdateNecessity = v.variant('adjudicator', [
  v.object({
    adjudicator: v.literal('new'),
  }),
  v.object({
    adjudicator: v.literal('update'),
    fields: v.unknown(), //TODO: implement update logic
  }),
  v.object({
    adjudicator: v.literal('match'),
  }),
]);

export type AdjudicatorUpdateNecessity = v.InferOutput<
  typeof AdjudicatorUpdateNecessity
>;
