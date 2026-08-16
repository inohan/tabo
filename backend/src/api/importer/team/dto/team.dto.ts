import { TeamImportSessionDto } from '@importer/infrastructure/query/team-import-session.query';
import { createDto } from 'src/api/lib/valibot';

export const NestTeamImportSessionDto = createDto(
  'NestTeamImportSessionDto',
  TeamImportSessionDto,
);

export type NestTeamImportSessionDto = TeamImportSessionDto;
