import { createDto } from 'src/api/lib/valibot';
import * as v from 'valibot';

const UploadUrlSchema = v.object({
  id: v.string(),
  url: v.pipe(v.string(), v.url()),
});

export const NestUploadUrlDto = createDto('NestUploadUrlDto', UploadUrlSchema);

export type NestUploadUrlDto = v.InferOutput<typeof UploadUrlSchema>;
