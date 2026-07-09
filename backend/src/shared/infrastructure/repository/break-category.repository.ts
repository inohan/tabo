import { BreakCategoryRepositoryPort } from 'src/shared/domain/repository';
import { Db } from '../persistence/db';
import { err, ok, Result } from 'neverthrow';
import {
  BreakCategory,
  BreakCategoryId,
  TournamentId,
  NotFoundError,
  SaveFailedError,
} from 'src/shared/domain';

export class BreakCategoryRepository extends BreakCategoryRepositoryPort {
  constructor(private readonly db: Db) {
    super();
  }

  async get({
    tournamentId,
    breakCategoryId,
  }: {
    tournamentId: TournamentId;
    breakCategoryId: BreakCategoryId;
  }): Promise<Result<BreakCategory, NotFoundError>> {
    const row = await this.db
      .selectFrom('breakCategory')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', breakCategoryId)
      .executeTakeFirst();
    if (!row) {
      return err(
        new NotFoundError(
          `Break category ${breakCategoryId} not found in tournament ${tournamentId}`,
        ),
      );
    }
    return ok(toModel(row));
  }

  async getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<BreakCategory[], never>> {
    const rows = await this.db
      .selectFrom('breakCategory')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .execute();
    return ok(rows.map(toModel));
  }

  async save(
    breakCategory: BreakCategory,
  ): Promise<Result<void, SaveFailedError>> {
    const {
      tournamentId,
      id,
      name,
      slug,
      seq,
      breakSize,
      reserveSize,
      isGeneral,
      priority,
    } = breakCategory;
    const saved = await this.db
      .insertInto('breakCategory')
      .values({
        tournamentId,
        id,
        name,
        slug,
        seq,
        breakSize,
        reserveSize,
        isGeneral,
        priority,
      })
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          name,
          slug,
          seq,
          breakSize,
          reserveSize,
          isGeneral,
          priority,
        }),
      )
      .returningAll()
      .executeTakeFirst();
    if (!saved) {
      return err(
        new SaveFailedError(
          `Failed to save break category ${id} in tournament ${tournamentId}`,
        ),
      );
    }
    return ok();
  }

  async delete(
    breakCategory: BreakCategory,
  ): Promise<Result<void, NotFoundError>> {
    const deleted = await this.db
      .deleteFrom('breakCategory')
      .where('tournamentId', '=', breakCategory.tournamentId)
      .where('id', '=', breakCategory.id)
      .executeTakeFirst();
    if (deleted.numDeletedRows === 0n) {
      return err(
        new NotFoundError(
          `Break category ${breakCategory.id} not found in tournament ${breakCategory.tournamentId}`,
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
  slug: string;
  seq: number;
  breakSize: number;
  reserveSize: number;
  isGeneral: boolean;
  priority: number;
}): BreakCategory {
  return BreakCategory.init({
    id: BreakCategoryId.init(row.id),
    tournamentId: TournamentId.init(row.tournamentId),
    name: row.name,
    slug: row.slug,
    seq: row.seq,
    breakSize: row.breakSize,
    reserveSize: row.reserveSize,
    isGeneral: row.isGeneral,
    priority: row.priority,
  });
}
