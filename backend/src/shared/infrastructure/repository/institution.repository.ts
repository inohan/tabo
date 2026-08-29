import { InstitutionRepositoryPort } from 'src/shared/domain/repository';
import { Db, DbSchema } from '../persistence/db';
import { err, ok, Result } from 'neverthrow';
import {
  Institution,
  InstitutionId,
  TournamentId,
  SaveFailedError,
} from 'src/shared/domain';
import { Selectable } from 'kysely';

export class InstitutionRepository extends InstitutionRepositoryPort {
  constructor(private readonly db: Db) {
    super();
  }

  async get({
    tournamentId,
    institutionId,
  }: {
    tournamentId: TournamentId;
    institutionId: InstitutionId;
  }) {
    const row = await this.db
      .selectFrom('institution')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', institutionId)
      .executeTakeFirst();
    if (!row) {
      return ok(undefined);
    }
    return ok(toModel(row));
  }

  async getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<Institution[], never>> {
    const rows = await this.db
      .selectFrom('institution')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .execute();
    return ok(rows.map(toModel));
  }

  async save(institution: Institution): Promise<Result<void, SaveFailedError>> {
    const { tournamentId, id, name, code } = institution;
    const saved = await this.db
      .insertInto('institution')
      .values({
        tournamentId,
        id,
        name,
        code,
      })
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          name,
          code,
        }),
      )
      .executeTakeFirst();
    if (saved.numInsertedOrUpdatedRows !== 1n) {
      return err(
        new SaveFailedError(
          `Failed to save institution ${id} in tournament ${tournamentId}`,
        ),
      );
    }
    return ok();
  }

  async saveMany(
    institutions: Institution[],
  ): Promise<Result<void, SaveFailedError>> {
    if (institutions.length === 0) {
      return ok();
    }
    const saved = await this.db
      .insertInto('institution')
      .values(
        institutions.map(({ tournamentId, id, name, code }) => ({
          tournamentId,
          id,
          name,
          code,
        })),
      )
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          name: (eb) => eb.ref('excluded.name'),
          code: (eb) => eb.ref('excluded.code'),
        }),
      )
      .executeTakeFirst();
    if (saved.numInsertedOrUpdatedRows !== BigInt(institutions.length)) {
      return err(
        new SaveFailedError(
          `Failed to save institution(s) ${institutions.map((i) => `(${i.tournamentId}, ${i.id})`).join(', ')}`,
        ),
      );
    }
    return ok();
  }

  async delete(
    institution: Institution,
  ): Promise<Result<void, SaveFailedError>> {
    const deleted = await this.db
      .deleteFrom('institution')
      .where('tournamentId', '=', institution.tournamentId)
      .where('id', '=', institution.id)
      .executeTakeFirst();
    if (deleted.numDeletedRows === 0n) {
      return err(
        new SaveFailedError(
          `Institution ${institution.id} not found in tournament ${institution.tournamentId}`,
        ),
      );
    }
    return ok();
  }

  async deleteMany(
    institutions: Institution[],
  ): Promise<Result<void, SaveFailedError>> {
    if (institutions.length === 0) {
      return ok();
    }
    const deleted = await this.db
      .deleteFrom('institution')
      .where((eb) =>
        eb.eb(
          eb.refTuple('tournamentId', 'id'),
          'in',
          institutions.map((institution) =>
            eb.tuple(institution.tournamentId, institution.id),
          ),
        ),
      )
      .executeTakeFirst();
    if (deleted.numDeletedRows !== BigInt(institutions.length)) {
      return err(
        new SaveFailedError(
          `Institution(s) ${institutions.map((i) => `(${i.tournamentId}, ${i.id})`).join(', ')} not found`,
        ),
      );
    }
    return ok();
  }
}

function toModel(row: Selectable<DbSchema['institution']>): Institution {
  return Institution.init({
    id: InstitutionId.init(row.id),
    tournamentId: TournamentId.init(row.tournamentId),
    name: row.name,
    code: row.code,
  });
}
