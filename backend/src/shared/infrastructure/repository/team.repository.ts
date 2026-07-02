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

export class TeamRepository implements TeamRepositoryPort {
  constructor(private readonly db: Db) {}

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
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('teamInstitutionConflict').select('institutionId').whereRef('teamInstitutionConflict.tournamentId', '=', 'team.tournamentId').whereRef('teamInstitutionConflict.teamId', '=', 'team.id')})`.as(
          'institutionConflicts',
        ),
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('teamBreakCategory').select('breakCategoryId').whereRef('teamBreakCategory.tournamentId', '=', 'team.tournamentId').whereRef('teamBreakCategory.teamId', '=', 'team.id')})`.as(
          'breakCategories',
        ),
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
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('teamInstitutionConflict').select('institutionId').whereRef('teamInstitutionConflict.tournamentId', '=', 'team.tournamentId').whereRef('teamInstitutionConflict.teamId', '=', 'team.id')})`.as(
          'institutionConflicts',
        ),
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('teamBreakCategory').select('breakCategoryId').whereRef('teamBreakCategory.tournamentId', '=', 'team.tournamentId').whereRef('teamBreakCategory.teamId', '=', 'team.id')})`.as(
          'breakCategories',
        ),
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
    try {
      await this.db.transaction().execute(async (trx) => {
        const saved = await trx
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
            }),
          )
          .returningAll()
          .executeTakeFirst();
        if (!saved) {
          throw new SaveFailedError(
            `Failed to save team ${id} in tournament ${tournamentId}`,
          );
        }
        await trx
          .deleteFrom('teamInstitutionConflict')
          .where('tournamentId', '=', tournamentId)
          .where('teamId', '=', id)
          .where('institutionId', 'not in', institutionConflicts)
          .execute();
        if (institutionConflicts.length > 0) {
          await trx
            .insertInto('teamInstitutionConflict')
            .values(
              institutionConflicts.map((instId) => ({
                tournamentId,
                teamId: id,
                institutionId: instId,
              })),
            )
            .onConflict((oc) =>
              oc
                .columns(['tournamentId', 'teamId', 'institutionId'])
                .doNothing(),
            )
            .execute();
        }
        await trx
          .deleteFrom('teamBreakCategory')
          .where('tournamentId', '=', tournamentId)
          .where('teamId', '=', id)
          .where('breakCategoryId', 'not in', breakCategories)
          .execute();
        if (breakCategories.length > 0) {
          await trx
            .insertInto('teamBreakCategory')
            .values(
              breakCategories.map((breakCategoryId) => ({
                tournamentId,
                teamId: id,
                breakCategoryId,
              })),
            )
            .onConflict((oc) =>
              oc
                .columns(['tournamentId', 'teamId', 'breakCategoryId'])
                .doNothing(),
            )
            .execute();
        }
      });
    } catch (error) {
      return err(
        new SaveFailedError(
          `Failed to save team ${id} in tournament ${tournamentId}: ${error as Error}`,
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

function toModel(row: {
  tournamentId: string;
  id: number;
  reference: string;
  shortReference: string;
  institutionId: number | null;
  emoji: string | null;
  codeName: string;
  useInstitutionPrefix: boolean;
  shortName: string;
  longName: string;
  institutionConflicts: number[];
  breakCategories: number[];
  speakers: number[];
}): Team {
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
