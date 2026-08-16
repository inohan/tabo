import { OAuth2Client, GoogleAuth } from 'google-auth-library';

import * as v from 'valibot';

export const ImportCredentials = v.variant('type', [
  v.object({
    type: v.literal('none'),
  }),
  v.object({
    type: v.literal('google'),
    accessToken: v.string(),
  }),
  v.object({
    type: v.literal('google'),
    auth: v.union([v.instance(OAuth2Client), v.instance(GoogleAuth)]),
  }),
]);

export type ImportCredentials = v.InferOutput<typeof ImportCredentials>;
