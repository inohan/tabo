import { SpeakerCategoryRepositoryPort } from 'src/shared/domain/repository';
import { Db, DbSchema } from '../persistence/db';
import { err, ok, Result } from 'neverthrow';
import {
  SpeakerCategory,
  SpeakerCategoryId,
  TournamentId,
  NotFoundError,
  SaveFailedError,
} from 'src/shared/domain';
import { Selectable } from 'kysely';

export class SpeakerCategoryRepository extends SpeakerCategoryRepositoryPort {
  constructor(private readonly db: Db) {
    super();
  }

  async get({
    tournamentId,
    speakerCategoryId,
  }: {
    tournamentId: TournamentId;
    speakerCategoryId: SpeakerCategoryId;
  }): Promise<Result<SpeakerCategory, NotFoundError>> {
    const row = await this.db
      .selectFrom('speakerCategory')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', speakerCategoryId)
      .executeTakeFirst();
    if (!row) {
      return err(
        new NotFoundError(
          `Speaker category ${speakerCategoryId} not found in tournament ${tournamentId}`,
        ),
      );
    }
    return ok(toModel(row));
  }

  async getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<SpeakerCategory[], never>> {
    const rows = await this.db
      .selectFrom('speakerCategory')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .execute();
    return ok(rows.map(toModel));
  }

  async save(
    speakerCategory: SpeakerCategory,
  ): Promise<Result<void, SaveFailedError>> {
    const { tournamentId, id, name, slug, seq } = speakerCategory;
    const saved = await this.db
      .insertInto('speakerCategory')
      .values({ tournamentId, id, name, slug, seq })
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({ name, slug, seq }),
      )
      .executeTakeFirst();
    if (saved.numInsertedOrUpdatedRows !== 1n) {
      return err(
        new SaveFailedError(
          `Failed to save speaker category ${id} in tournament ${tournamentId}`,
        ),
      );
    }
    return ok();
  }

  async saveMany(
    speakerCategories: SpeakerCategory[],
  ): Promise<Result<void, SaveFailedError>> {
    if (speakerCategories.length === 0) {
      return ok();
    }
    const saved = await this.db
      .insertInto('speakerCategory')
      .values(
        speakerCategories.map(({ tournamentId, id, name, slug, seq }) => ({
          tournamentId,
          id,
          name,
          slug,
          seq,
        })),
      )
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          name: (eb) => eb.ref('excluded.name'),
          slug: (eb) => eb.ref('excluded.slug'),
          seq: (eb) => eb.ref('excluded.seq'),
        }),
      )
      .executeTakeFirst();
    if (saved.numInsertedOrUpdatedRows !== BigInt(speakerCategories.length)) {
      return err(
        new SaveFailedError(
          `Failed to save speaker category(s) ${speakerCategories.map((sc) => `(${sc.tournamentId}, ${sc.id})`).join(', ')}`,
        ),
      );
    }
    return ok();
  }

  async delete(
    speakerCategory: SpeakerCategory,
  ): Promise<Result<void, NotFoundError>> {
    const deleted = await this.db
      .deleteFrom('speakerCategory')
      .where('tournamentId', '=', speakerCategory.tournamentId)
      .where('id', '=', speakerCategory.id)
      .executeTakeFirst();
    if (deleted.numDeletedRows === 0n) {
      return err(
        new NotFoundError(
          `Speaker category ${speakerCategory.id} not found in tournament ${speakerCategory.tournamentId}`,
        ),
      );
    }
    return ok();
  }

  async deleteMany(
    speakerCategories: SpeakerCategory[],
  ): Promise<Result<void, NotFoundError>> {
    if (speakerCategories.length === 0) {
      return ok();
    }
    const deleted = await this.db
      .deleteFrom('speakerCategory')
      .where((eb) =>
        eb.eb(
          eb.refTuple('tournamentId', 'id'),
          'in',
          speakerCategories.map((speakerCategory) =>
            eb.tuple(speakerCategory.tournamentId, speakerCategory.id),
          ),
        ),
      )
      .executeTakeFirst();
    if (deleted.numDeletedRows !== BigInt(speakerCategories.length)) {
      return err(
        new NotFoundError(
          `Speaker category(s) ${speakerCategories.map((sc) => `(${sc.tournamentId}, ${sc.id})`).join(', ')} not found`,
        ),
      );
    }
    return ok();
  }
}

function toModel(
  row: Selectable<DbSchema['speakerCategory']>,
): SpeakerCategory {
  return SpeakerCategory.init({
    id: SpeakerCategoryId.init(row.id),
    tournamentId: TournamentId.init(row.tournamentId),
    name: row.name,
    slug: row.slug,
    seq: row.seq,
  });
}
