import { AdjudicatorRepositoryPort } from 'src/shared/domain/repository';
import { Db, DbSchema } from '../persistence/db';
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
import { Selectable } from 'kysely';

export class AdjudicatorRepository extends AdjudicatorRepositoryPort {
  constructor(private readonly db: Db) {
    super();
  }

  async get({
    tournamentId,
    adjudicatorId,
  }: {
    tournamentId: TournamentId;
    adjudicatorId: AdjudicatorId;
  }): Promise<Result<Adjudicator, NotFoundError>> {
    const adjudicator = await this.db
      .selectFrom('adjudicator')
      .selectAll()
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
      .selectAll()
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
    const saved = await this.db
      .insertInto('adjudicator')
      .values({
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
      })
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          name,
          institutionId,
          breaking,
          independent,
          adjCore,
          institutionConflicts,
          teamConflicts,
          adjudicatorConflicts,
        }),
      )
      .executeTakeFirst();
    if (saved.numInsertedOrUpdatedRows !== 1n) {
      return err(
        new SaveFailedError(
          `Failed to save adjudicator id ${id} in tournament ${tournamentId}`,
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

function toModel(row: Selectable<DbSchema['adjudicator']>): Adjudicator {
  return Adjudicator.init({
    id: AdjudicatorId.init(row.id),
    tournamentId: TournamentId.init(row.tournamentId),
    name: row.name,
    email: row.email,
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
