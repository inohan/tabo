import { ImportOrigin } from '@importer/domain/values';
import { createDto } from 'src/api/lib/valibot';
import * as v from 'valibot';

export const NestImportOrigin = createDto('ImportOrigin', ImportOrigin);

export type NestImportOrigin = v.InferOutput<typeof ImportOrigin>;
