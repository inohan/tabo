import * as v from 'valibot';

export const ImportOrigin = v.variant('type', [
  v.object({
    type: v.literal('google-sheets'),
    id: v.string(),
    tableId: v.string(),
  }),
  v.object({
    type: v.literal('excel'),
    id: v.string(),
    tableId: v.string(),
  }),
  v.object({
    type: v.literal('csv'),
    id: v.string(),
  }),
]);

export type ImportOrigin = v.InferOutput<typeof ImportOrigin>;
