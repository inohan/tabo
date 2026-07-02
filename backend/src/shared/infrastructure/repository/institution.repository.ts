import { InstitutionRepositoryPort } from 'src/shared/domain/repository';
import { Db } from '../persistence/db';
import { err, ok, Result } from 'neverthrow';
import {
  Institution,
  InstitutionId,
  TournamentId,
  NotFoundError,
  SaveFailedError,
} from 'src/shared/domain';

export class InstitutionRepository implements InstitutionRepositoryPort {
  constructor(private readonly db: Db) {}

  async get({
    tournamentId,
    institutionId,
  }: {
    tournamentId: TournamentId;
    institutionId: InstitutionId;
  }): Promise<Result<Institution, NotFoundError>> {
    const row = await this.db
      .selectFrom('institution')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', institutionId)
      .executeTakeFirst();
    if (!row) {
      return err(
        new NotFoundError(
          `Institution ${institutionId} not found in tournament ${tournamentId}`,
        ),
      );
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
        createdAt: new Date(),
        updatedAt: null,
      })
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          name,
          code,
          updatedAt: new Date(),
        }),
      )
      .returningAll()
      .executeTakeFirst();
    if (!saved) {
      return err(
        new SaveFailedError(
          `Failed to save institution ${id} in tournament ${tournamentId}`,
        ),
      );
    }
    return ok();
  }

  async delete(institution: Institution): Promise<Result<void, NotFoundError>> {
    const deleted = await this.db
      .deleteFrom('institution')
      .where('tournamentId', '=', institution.tournamentId)
      .where('id', '=', institution.id)
      .executeTakeFirst();
    if (deleted.numDeletedRows === 0n) {
      return err(
        new NotFoundError(
          `Institution ${institution.id} not found in tournament ${institution.tournamentId}`,
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
  code: string;
}): Institution {
  return Institution.init({
    id: InstitutionId.init(row.id),
    tournamentId: TournamentId.init(row.tournamentId),
    name: row.name,
    code: row.code,
  });
}
