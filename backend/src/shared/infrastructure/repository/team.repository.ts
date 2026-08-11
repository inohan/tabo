import { TeamRepositoryPort } from 'src/shared/domain/repository';
import { Db } from '../persistence/db';
import { err, ok, Result } from 'neverthrow';
import {
  Team,
  TeamId,
  TournamentId,
  InstitutionId,
  BreakCategoryId,
  SpeakerId,
  NotFoundError,
  SaveFailedError,
} from 'src/shared/domain';
import { sql } from 'kysely';

export class TeamRepository extends TeamRepositoryPort {
  constructor(private readonly db: Db) {
    super();
  }

  async get({
    tournamentId,
    teamId,
  }: {
    tournamentId: TournamentId;
    teamId: TeamId;
  }): Promise<Result<Team, NotFoundError>> {
    const team = await this.db
      .selectFrom('team')
      .select((eb) => [
        'tournamentId',
        'id',
        'reference',
        'shortReference',
        'institutionId',
        'emoji',
        'codeName',
        'useInstitutionPrefix',
        'shortName',
        'longName',
        'institutionConflicts',
        'breakCategories',
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('speaker').select('id').whereRef('speaker.tournamentId', '=', 'team.tournamentId').whereRef('speaker.teamId', '=', 'team.id')})`.as(
          'speakers',
        ),
      ])
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', teamId)
      .executeTakeFirst();
    if (team === undefined) {
      return err(
        new NotFoundError(
          `Team ${teamId} not found in tournament ${tournamentId}`,
        ),
      );
    }
    return ok(toModel(team));
  }

  async getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<Team[], never>> {
    const teams = await this.db
      .selectFrom('team')
      .select((eb) => [
        'tournamentId',
        'id',
        'reference',
        'shortReference',
        'institutionId',
        'emoji',
        'codeName',
        'useInstitutionPrefix',
        'shortName',
        'longName',
        'institutionConflicts',
        'breakCategories',
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('speaker').select('id').whereRef('speaker.tournamentId', '=', 'team.tournamentId').whereRef('speaker.teamId', '=', 'team.id')})`.as(
          'speakers',
        ),
      ])
      .where('tournamentId', '=', tournamentId)
      .execute();

    return ok(teams.map((team) => toModel(team)));
  }

  async save(team: Team): Promise<Result<void, SaveFailedError>> {
    const {
      tournamentId,
      id,
      reference,
      shortReference,
      institutionId,
      emoji,
      codeName,
      useInstitutionPrefix,
      shortName,
      longName,
      institutionConflicts,
      breakCategories,
    } = team;
    const saved = await this.db
      .insertInto('team')
      .values({
        tournamentId,
        id,
        reference,
        shortReference,
        institutionId,
        emoji,
        codeName,
        useInstitutionPrefix,
        shortName,
        longName,
        institutionConflicts,
        breakCategories,
      })
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          reference,
          shortReference,
          institutionId,
          emoji,
          codeName,
          useInstitutionPrefix,
          shortName,
          longName,
          institutionConflicts,
          breakCategories,
        }),
      )
      .executeTakeFirst();
    if (saved.numInsertedOrUpdatedRows !== 1n) {
      return err(
        new SaveFailedError(
          `Failed to save team ${id} in tournament ${tournamentId}`,
        ),
      );
    }
    return ok();
  }

  async delete(team: Team): Promise<Result<void, NotFoundError>> {
    const result = await this.db
      .deleteFrom('team')
      .where('tournamentId', '=', team.tournamentId)
      .where('id', '=', team.id)
      .executeTakeFirst();
    if (result.numDeletedRows === 0n) {
      return err(
        new NotFoundError(
          `Team ${team.id} not found in tournament ${team.tournamentId}`,
        ),
      );
    }
    return ok();
  }
}

// Used only for typing
const selector = async (db: Db) =>
  await db
    .selectFrom('team')
    .select((eb) => [
      'tournamentId',
      'id',
      'reference',
      'shortReference',
      'institutionId',
      'emoji',
      'codeName',
      'useInstitutionPrefix',
      'shortName',
      'longName',
      'institutionConflicts',
      'breakCategories',
      sql<
        number[]
      >`ARRAY(${eb.selectFrom('speaker').select('id').whereRef('speaker.tournamentId', '=', 'team.tournamentId').whereRef('speaker.teamId', '=', 'team.id')})`.as(
        'speakers',
      ),
    ])
    .executeTakeFirstOrThrow();

function toModel(row: Awaited<ReturnType<typeof selector>>): Team {
  return Team.init({
    id: TeamId.init(row.id),
    tournamentId: TournamentId.init(row.tournamentId),
    reference: row.reference,
    shortReference: row.shortReference,
    institutionId: row.institutionId
      ? InstitutionId.init(row.institutionId)
      : null,
    institutionConflicts: row.institutionConflicts.map(InstitutionId.init),
    breakCategories: row.breakCategories.map(BreakCategoryId.init),
    speakers: row.speakers.map(SpeakerId.init),
    emoji: row.emoji,
    codeName: row.codeName,
    useInstitutionPrefix: row.useInstitutionPrefix,
    shortName: row.shortName,
    longName: row.longName,
  });
}
