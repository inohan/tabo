import * as v from 'valibot';

export const ImportOriginSource = v.variant('type', [
  v.object({
    type: v.literal('file'),
    id: v.string(),
  }),
  v.object({
    type: v.literal('google'),
    id: v.string(),
  }),
]);

export type ImportOriginSource = v.InferOutput<typeof ImportOriginSource>;
