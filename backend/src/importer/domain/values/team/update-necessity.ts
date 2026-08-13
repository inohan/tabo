import * as v from 'valibot';

export const TeamUpdateNecessity = v.variant('team', [
  v.object({
    team: v.literal('new'),
  }),
  v.object({
    team: v.literal('update'),
    fields: v.unknown(), //TODO: implement update logic
    speakers: v.array(v.picklist(['new', 'update', 'match'])),
  }),
  v.object({
    team: v.literal('match'),
  }),
]);

export type TeamUpdateNecessity = v.InferOutput<typeof TeamUpdateNecessity>;
