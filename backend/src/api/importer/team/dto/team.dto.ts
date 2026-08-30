import * as v from 'valibot';
import {
  TeamImportRowDto,
  TeamImportSessionDto,
} from '@importer/infrastructure/query/team-import-session.query';
import { createDto } from 'src/api/lib/valibot';

export const NestTeamImportSessionDto = createDto(
  'NestTeamImportSessionDto',
  TeamImportSessionDto,
);
export type NestTeamImportSessionDto = TeamImportSessionDto;

export const NestTeamImportRowDto = createDto(
  'NestTeamImportRowDto',
  TeamImportRowDto,
);
export type NestTeamImportRowDto = TeamImportRowDto;

const MissingEntitiesSchema = v.object({
  institutions: v.array(v.string()),
  breakCategories: v.array(v.string()),
  speakerCategories: v.array(v.string()),
});

export const NestTeamImportMissingEntitiesDto = createDto(
  'NestTeamImportMissingEntitiesDto',
  MissingEntitiesSchema,
);
export type NestTeamImportMissingEntitiesDto = v.InferOutput<
  typeof MissingEntitiesSchema
>;
