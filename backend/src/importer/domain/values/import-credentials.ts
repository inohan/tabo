import * as v from 'valibot';

export const ImportCredentials = v.variant('type', [
  v.object({
    type: v.literal('none'),
  }),
  v.object({
    type: v.literal('google'),
    accessToken: v.string(),
  }),
]);

export type ImportCredentials = v.InferOutput<typeof ImportCredentials>;
