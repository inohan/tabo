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
  }) {
    const adjudicator = await this.db
      .selectFrom('adjudicator')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', adjudicatorId)
      .executeTakeFirst();
    if (adjudicator === undefined) {
      return ok(undefined);
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
      email,
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
        email,
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
          email,
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

  async saveMany(
    adjudicators: Adjudicator[],
  ): Promise<Result<void, SaveFailedError>> {
    if (adjudicators.length === 0) {
      return ok();
    }
    const saved = await this.db
      .insertInto('adjudicator')
      .values(
        adjudicators.map(
          ({
            tournamentId,
            id,
            name,
            email,
            institutionId,
            breaking,
            independent,
            adjCore,
            institutionConflicts,
            teamConflicts,
            adjudicatorConflicts,
          }) => ({
            tournamentId,
            id,
            name,
            email,
            institutionId,
            breaking,
            independent,
            adjCore,
            institutionConflicts,
            teamConflicts,
            adjudicatorConflicts,
          }),
        ),
      )
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          name: (eb) => eb.ref('excluded.name'),
          email: (eb) => eb.ref('excluded.email'),
          institutionId: (eb) => eb.ref('excluded.institutionId'),
          breaking: (eb) => eb.ref('excluded.breaking'),
          independent: (eb) => eb.ref('excluded.independent'),
          adjCore: (eb) => eb.ref('excluded.adjCore'),
          institutionConflicts: (eb) => eb.ref('excluded.institutionConflicts'),
          teamConflicts: (eb) => eb.ref('excluded.teamConflicts'),
          adjudicatorConflicts: (eb) => eb.ref('excluded.adjudicatorConflicts'),
        }),
      )
      .executeTakeFirst();
    if (saved.numInsertedOrUpdatedRows !== BigInt(adjudicators.length)) {
      return err(
        new SaveFailedError(
          `Failed to save adjudicator(s) ${adjudicators.map((a) => `(${a.tournamentId}, ${a.id})`).join(', ')}`,
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

  async deleteMany(
    adjudicators: Adjudicator[],
  ): Promise<Result<void, NotFoundError>> {
    if (adjudicators.length === 0) {
      return ok();
    }
    const deleted = await this.db
      .deleteFrom('adjudicator')
      .where((eb) =>
        eb.eb(
          eb.refTuple('tournamentId', 'id'),
          'in',
          adjudicators.map((adjudicator) =>
            eb.tuple(adjudicator.tournamentId, adjudicator.id),
          ),
        ),
      )
      .executeTakeFirst();
    if (deleted.numDeletedRows !== BigInt(adjudicators.length)) {
      return err(
        new NotFoundError(
          `Adjudicator(s) ${adjudicators.map((a) => `(${a.tournamentId}, ${a.id})`).join(', ')} not found`,
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
