import { createDto } from 'src/api/lib/valibot';
import { integerSchema } from 'src/lib/integer';
import * as v from 'valibot';

const NestDoImportUpdateSchema = v.object({
  index: integerSchema,
  doImport: v.boolean(),
});

export const NestDoImportUpdateDto = createDto(
  'NestDoImportUpdateDto',
  NestDoImportUpdateSchema,
);

export type NestDoImportUpdateDto = v.InferOutput<
  typeof NestDoImportUpdateSchema
>;
