import { Db, DbSchema } from '../persistence/db';
import { TeamId, TournamentId } from '../../domain';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { Selectable } from 'kysely';

export type TeamSpeakerDto = {
  id: number;
  name: string;
  categories: number[];
  anonymous: boolean;
  email: string | null;

  institution: number | null;
};

export type TeamDto = {
  tournamentId: string;

  id: number;
  reference: string;
  shortReference: string;
  institution: number | null;
  institutionConflicts: number[];
  speakers: TeamSpeakerDto[];
  breakCategories: number[];
  emoji: string | null;
  codeName: string;
  useInstitutionPrefix: boolean;
  shortName: string;
  longName: string;
};

const toTeamSpeakerDto = (
  result: Selectable<DbSchema['speaker']>,
): TeamSpeakerDto => ({
  id: result.id,
  name: result.name,
  email: result.email,
  anonymous: result.anonymous,
  categories: result.categories,

  institution: result.institutionId,
});

const toDto = (
  result: Selectable<DbSchema['team']> & {
    speakers: Selectable<DbSchema['speaker']>[];
  },
): TeamDto => ({
  tournamentId: result.tournamentId,

  id: result.id,
  reference: result.reference,
  shortReference: result.shortReference,
  institution: result.institutionId,
  institutionConflicts: result.institutionConflicts,
  breakCategories: result.breakCategories,
  emoji: result.emoji,
  codeName: result.codeName,
  useInstitutionPrefix: result.useInstitutionPrefix,
  shortName: result.shortName,
  longName: result.longName,
  speakers: result.speakers.map(toTeamSpeakerDto),
});

export class TeamQuery {
  constructor(private db: Db) {}

  async get({
    tournamentId,
    teamId,
  }: {
    tournamentId: TournamentId;
    teamId: TeamId;
  }): Promise<TeamDto | undefined> {
    const queryResult = await this.db
      .selectFrom('team')
      .select((eb) => [
        'tournamentId',
        'id',
        'reference',
        'shortReference',
        'institutionId',
        'institutionConflicts',
        'breakCategories',
        'emoji',
        'codeName',
        'useInstitutionPrefix',
        'shortName',
        'longName',
        jsonArrayFrom(
          eb
            .selectFrom('speaker')
            .selectAll()
            .whereRef('speaker.tournamentId', '=', 'team.tournamentId')
            .whereRef('speaker.teamId', '=', 'team.id')
            .orderBy('speaker.id'),
        ).as('speakers'),
      ])
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', teamId)
      .executeTakeFirst();
    if (queryResult === undefined) {
      return undefined;
    }
    return toDto(queryResult);
  }

  async getAll({
    tournamentId,
    institutionIds,
  }: {
    tournamentId: TournamentId;
    institutionIds: TeamId[];
  }): Promise<TeamDto[]> {
    if (institutionIds.length === 0) {
      return [];
    }
    const queryResults = await this.db
      .selectFrom('team')
      .select((eb) => [
        'tournamentId',
        'id',
        'reference',
        'shortReference',
        'institutionId',
        'institutionConflicts',
        'breakCategories',
        'emoji',
        'codeName',
        'useInstitutionPrefix',
        'shortName',
        'longName',
        jsonArrayFrom(
          eb
            .selectFrom('speaker')
            .selectAll()
            .whereRef('speaker.tournamentId', '=', 'team.tournamentId')
            .whereRef('speaker.teamId', '=', 'team.id')
            .orderBy('speaker.id'),
        ).as('speakers'),
      ])
      .where('tournamentId', '=', tournamentId)
      .where('id', 'in', institutionIds)
      .orderBy('id')
      .execute();
    return queryResults.map(toDto);
  }

  async getByTournamentId({
    tournamentId,
  }: {
    tournamentId: TournamentId;
  }): Promise<TeamDto[]> {
    const queryResults = await this.db
      .selectFrom('team')
      .select((eb) => [
        'tournamentId',
        'id',
        'reference',
        'shortReference',
        'institutionId',
        'institutionConflicts',
        'breakCategories',
        'emoji',
        'codeName',
        'useInstitutionPrefix',
        'shortName',
        'longName',
        jsonArrayFrom(
          eb
            .selectFrom('speaker')
            .selectAll()
            .whereRef('speaker.tournamentId', '=', 'team.tournamentId')
            .whereRef('speaker.teamId', '=', 'team.id')
            .orderBy('speaker.id'),
        ).as('speakers'),
      ])
      .where('tournamentId', '=', tournamentId)
      .orderBy('id')
      .execute();
    return queryResults.map(toDto);
  }
}
