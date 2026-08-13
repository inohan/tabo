import { BreakCategoryRepositoryPort } from 'src/shared/domain/repository';
import { Db, DbSchema } from '../persistence/db';
import { err, ok, Result } from 'neverthrow';
import {
  BreakCategory,
  BreakCategoryId,
  TournamentId,
  NotFoundError,
  SaveFailedError,
} from 'src/shared/domain';
import { Selectable } from 'kysely';

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
      .executeTakeFirst();
    if (saved.numInsertedOrUpdatedRows !== 1n) {
      return err(
        new SaveFailedError(
          `Failed to save break category ${id} in tournament ${tournamentId}`,
        ),
      );
    }
    return ok();
  }

  async saveMany(
    breakCategories: BreakCategory[],
  ): Promise<Result<void, SaveFailedError>> {
    if (breakCategories.length === 0) {
      return ok();
    }
    const saved = await this.db
      .insertInto('breakCategory')
      .values(
        breakCategories.map(
          ({
            tournamentId,
            id,
            name,
            slug,
            seq,
            breakSize,
            reserveSize,
            isGeneral,
            priority,
          }) => ({
            tournamentId,
            id,
            name,
            slug,
            seq,
            breakSize,
            reserveSize,
            isGeneral,
            priority,
          }),
        ),
      )
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          name: (eb) => eb.ref('excluded.name'),
          slug: (eb) => eb.ref('excluded.slug'),
          seq: (eb) => eb.ref('excluded.seq'),
          breakSize: (eb) => eb.ref('excluded.breakSize'),
          reserveSize: (eb) => eb.ref('excluded.reserveSize'),
          isGeneral: (eb) => eb.ref('excluded.isGeneral'),
          priority: (eb) => eb.ref('excluded.priority'),
        }),
      )
      .executeTakeFirst();
    if (saved.numInsertedOrUpdatedRows !== BigInt(breakCategories.length)) {
      return err(
        new SaveFailedError(
          `Failed to save break category(s) ${breakCategories.map((bc) => `(${bc.tournamentId}, ${bc.id})`).join(', ')}`,
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

  async deleteMany(
    breakCategories: BreakCategory[],
  ): Promise<Result<void, NotFoundError>> {
    if (breakCategories.length === 0) {
      return ok();
    }
    const deleted = await this.db
      .deleteFrom('breakCategory')
      .where((eb) =>
        eb.eb(
          eb.refTuple('tournamentId', 'id'),
          'in',
          breakCategories.map((breakCategory) =>
            eb.tuple(breakCategory.tournamentId, breakCategory.id),
          ),
        ),
      )
      .executeTakeFirst();
    if (deleted.numDeletedRows !== BigInt(breakCategories.length)) {
      return err(
        new NotFoundError(
          `Break category(s) ${breakCategories.map((bc) => `(${bc.tournamentId}, ${bc.id})`).join(', ')} not found`,
        ),
      );
    }
    return ok();
  }
}

function toModel(row: Selectable<DbSchema['breakCategory']>): BreakCategory {
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
