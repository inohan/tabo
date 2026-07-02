import { AdjudicatorRepositoryPort } from 'src/shared/domain/repository';
import { Db } from '../persistence/db';
import { err, ok, Result } from 'neverthrow';
import {
  Adjudicator,
  AdjudicatorId,
  TournamentId,
  InstitutionId,
  TeamId,
  NotFoundError,
  SaveFailedError,
} from 'src/shared/domain';
import { sql } from 'kysely';

export class AdjudicatorRepository implements AdjudicatorRepositoryPort {
  constructor(private readonly db: Db) {}

  async get({
    tournamentId,
    adjudicatorId,
  }: {
    tournamentId: TournamentId;
    adjudicatorId: AdjudicatorId;
  }): Promise<Result<Adjudicator, NotFoundError>> {
    const adjudicator = await this.db
      .selectFrom('adjudicator')
      .select((eb) => [
        'tournamentId',
        'id',
        'name',
        'institutionId',
        'breaking',
        'independent',
        'adjCore',
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('adjudicatorInstitutionConflict').select('institutionId').whereRef('adjudicatorInstitutionConflict.tournamentId', '=', 'adjudicator.tournamentId').whereRef('adjudicatorInstitutionConflict.adjudicatorId', '=', 'adjudicator.id')})`.as(
          'institutionConflicts',
        ),
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('adjudicatorTeamConflict').select('teamId').whereRef('adjudicatorTeamConflict.tournamentId', '=', 'adjudicator.tournamentId').whereRef('adjudicatorTeamConflict.adjudicatorId', '=', 'adjudicator.id')})`.as(
          'teamConflicts',
        ),
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('adjudicatorAdjudicatorConflict').select('adjudicatorBId').whereRef('adjudicatorAdjudicatorConflict.tournamentId', '=', 'adjudicator.tournamentId').whereRef('adjudicatorAdjudicatorConflict.adjudicatorAId', '=', 'adjudicator.id')})`.as(
          'adjudicatorConflicts',
        ),
      ])
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', adjudicatorId)
      .executeTakeFirst();
    if (adjudicator === undefined) {
      return err(
        new NotFoundError(
          `Adjudicator ${adjudicatorId} not found in tournament ${tournamentId}`,
        ),
      );
    }
    return ok(toModel(adjudicator));
  }

  async getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<Adjudicator[], never>> {
    const adjudicators = await this.db
      .selectFrom('adjudicator')
      .select((eb) => [
        'tournamentId',
        'id',
        'name',
        'institutionId',
        'breaking',
        'independent',
        'adjCore',
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('adjudicatorInstitutionConflict').select('institutionId').whereRef('adjudicatorInstitutionConflict.tournamentId', '=', 'adjudicator.tournamentId').whereRef('adjudicatorInstitutionConflict.adjudicatorId', '=', 'adjudicator.id')})`.as(
          'institutionConflicts',
        ),
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('adjudicatorTeamConflict').select('teamId').whereRef('adjudicatorTeamConflict.tournamentId', '=', 'adjudicator.tournamentId').whereRef('adjudicatorTeamConflict.adjudicatorId', '=', 'adjudicator.id')})`.as(
          'teamConflicts',
        ),
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('adjudicatorAdjudicatorConflict').select('adjudicatorBId').whereRef('adjudicatorAdjudicatorConflict.tournamentId', '=', 'adjudicator.tournamentId').whereRef('adjudicatorAdjudicatorConflict.adjudicatorAId', '=', 'adjudicator.id')})`.as(
          'adjudicatorConflicts',
        ),
      ])
      .where('tournamentId', '=', tournamentId)
      .execute();

    return ok(adjudicators.map((adj) => toModel(adj)));
  }

  async save(adjudicator: Adjudicator): Promise<Result<void, SaveFailedError>> {
    const {
      tournamentId,
      id,
      name,
      institutionId,
      breaking,
      independent,
      adjCore,
      institutionConflicts,
      teamConflicts,
      adjudicatorConflicts,
    } = adjudicator;
    try {
      await this.db.transaction().execute(async (trx) => {
        const saved = await trx
          .insertInto('adjudicator')
          .values({
            tournamentId,
            id,
            name,
            institutionId,
            breaking,
            independent,
            adjCore,
          })
          .onConflict((oc) =>
            oc.columns(['tournamentId', 'id']).doUpdateSet({
              name,
              institutionId,
              breaking,
              independent,
              adjCore,
            }),
          )
          .returningAll()
          .executeTakeFirst();
        if (!saved) {
          throw new SaveFailedError(
            `Failed to save adjudicator ${id} in tournament ${tournamentId}`,
          );
        }
        await trx
          .deleteFrom('adjudicatorInstitutionConflict')
          .where('tournamentId', '=', tournamentId)
          .where('adjudicatorId', '=', id)
          .where('institutionId', 'not in', institutionConflicts)
          .execute();
        if (institutionConflicts.length > 0) {
          await trx
            .insertInto('adjudicatorInstitutionConflict')
            .values(
              institutionConflicts.map((instId) => ({
                tournamentId,
                adjudicatorId: id,
                institutionId: instId,
              })),
            )
            .onConflict((oc) =>
              oc
                .columns(['tournamentId', 'adjudicatorId', 'institutionId'])
                .doNothing(),
            )
            .execute();
        }
        await trx
          .deleteFrom('adjudicatorTeamConflict')
          .where('tournamentId', '=', tournamentId)
          .where('adjudicatorId', '=', id)
          .where('teamId', 'not in', teamConflicts)
          .execute();
        if (teamConflicts.length > 0) {
          await trx
            .insertInto('adjudicatorTeamConflict')
            .values(
              teamConflicts.map((teamId) => ({
                tournamentId,
                adjudicatorId: id,
                teamId,
              })),
            )
            .onConflict((oc) =>
              oc
                .columns(['tournamentId', 'adjudicatorId', 'teamId'])
                .doNothing(),
            )
            .execute();
        }
        await trx
          .deleteFrom('adjudicatorAdjudicatorConflict')
          .where('tournamentId', '=', tournamentId)
          .where('adjudicatorAId', '=', id)
          .where('adjudicatorBId', 'not in', adjudicatorConflicts)
          .execute();
        if (adjudicatorConflicts.length > 0) {
          await trx
            .insertInto('adjudicatorAdjudicatorConflict')
            .values(
              adjudicatorConflicts.map((adjBId) => ({
                tournamentId,
                adjudicatorAId: id,
                adjudicatorBId: adjBId,
              })),
            )
            .onConflict((oc) =>
              oc
                .columns(['tournamentId', 'adjudicatorAId', 'adjudicatorBId'])
                .doNothing(),
            )
            .execute();
        }
      });
    } catch (error) {
      return err(
        new SaveFailedError(
          `Failed to save adjudicator ${id} in tournament ${tournamentId}: ${error as Error}`,
        ),
      );
    }
    return ok();
  }

  async delete(adjudicator: Adjudicator): Promise<Result<void, NotFoundError>> {
    const result = await this.db
      .deleteFrom('adjudicator')
      .where('tournamentId', '=', adjudicator.tournamentId)
      .where('id', '=', adjudicator.id)
      .executeTakeFirst();
    if (result.numDeletedRows === 0n) {
      return err(
        new NotFoundError(
          `Adjudicator ${adjudicator.id} not found in tournament ${adjudicator.tournamentId}`,
        ),
      );
    }
    return ok();
  }
}

function toModel(row: {
  tournamentId: string;
  id: number;
  name: string;
  institutionId: number | null;
  breaking: boolean;
  independent: boolean;
  adjCore: boolean;
  institutionConflicts: number[];
  teamConflicts: number[];
  adjudicatorConflicts: number[];
}): Adjudicator {
  return Adjudicator.init({
    id: AdjudicatorId.init(row.id),
    tournamentId: TournamentId.init(row.tournamentId),
    name: row.name,
    institutionId: row.institutionId
      ? InstitutionId.init(row.institutionId)
      : null,
    breaking: row.breaking,
    independent: row.independent,
    adjCore: row.adjCore,
    institutionConflicts: row.institutionConflicts.map(InstitutionId.init),
    teamConflicts: row.teamConflicts.map(TeamId.init),
    adjudicatorConflicts: row.adjudicatorConflicts.map(AdjudicatorId.init),
  });
}
