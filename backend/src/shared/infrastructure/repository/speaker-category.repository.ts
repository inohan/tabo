import { SpeakerCategoryRepositoryPort } from 'src/shared/domain/repository';
import { Db } from '../persistence/db';
import { err, ok, Result } from 'neverthrow';
import {
  SpeakerCategory,
  SpeakerCategoryId,
  TournamentId,
  NotFoundError,
  SaveFailedError,
} from 'src/shared/domain';

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
      .returningAll()
      .executeTakeFirst();
    if (!saved) {
      return err(
        new SaveFailedError(
          `Failed to save speaker category ${id} in tournament ${tournamentId}`,
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
}

function toModel(row: {
  tournamentId: string;
  id: number;
  name: string;
  slug: string;
  seq: number;
}): SpeakerCategory {
  return SpeakerCategory.init({
    id: SpeakerCategoryId.init(row.id),
    tournamentId: TournamentId.init(row.tournamentId),
    name: row.name,
    slug: row.slug,
    seq: row.seq,
  });
}
