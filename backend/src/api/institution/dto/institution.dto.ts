import * as v from 'valibot';
import { createDto } from 'src/api/lib/valibot';
import { integerSchema } from 'src/lib/integer';

export const InstitutionSchema = v.object({
  tournamentId: v.pipe(v.string(), v.uuid()),

  id: integerSchema,
  name: v.string(),
  code: v.string(),
});

export const NestInstitutionDto = createDto(
  'NestInstitutionDto',
  InstitutionSchema,
);
export type NestInstitutionDto = v.InferOutput<typeof InstitutionSchema>;

export const CreateInstitutionSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1)),
  code: v.pipe(v.string(), v.trim(), v.minLength(1)),
});

export const NestCreateInstitutionDto = createDto(
  'NestCreateInstitutionDto',
  CreateInstitutionSchema,
);
export type NestCreateInstitutionDto = v.InferOutput<
  typeof CreateInstitutionSchema
>;
