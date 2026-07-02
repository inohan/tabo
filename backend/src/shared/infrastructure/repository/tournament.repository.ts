import { TournamentRepositoryPort } from 'src/shared/domain/repository';
import { Db } from '../persistence/db';
import { err, ok, Result } from 'neverthrow';
import {
  TournamentId,
  Tournament,
  NotFoundError,
  SaveFailedError,
} from 'src/shared/domain';

export class TournamentRepository implements TournamentRepositoryPort {
  constructor(private readonly db: Db) {}

  async get(id: TournamentId): Promise<Result<Tournament, NotFoundError>> {
    const tournament = await this.db
      .selectFrom('tournament')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
    if (tournament === undefined) {
      return err(new NotFoundError(`Tournament with id ${id} not found`));
    }
    return ok(toModel(tournament));
  }

  async save({
    id,
    baseUrl,
    name,
    shortName,
    slug,
    tabId,
  }: Tournament): Promise<Result<void, SaveFailedError>> {
    const saved = await this.db
      .insertInto('tournament')
      .values({
        id,
        baseUrl,
        name,
        shortName,
        slug,
        tabId,
        createdAt: new Date(),
        updatedAt: null,
      })
      .onConflict((oc) =>
        oc.column('id').doUpdateSet({
          baseUrl,
          name,
          shortName,
          slug,
          tabId,
          updatedAt: new Date(),
        }),
      )
      .executeTakeFirst();
    if (saved === undefined) {
      return err(
        new SaveFailedError(`Failed to save tournament with id ${id}`),
      );
    }
    return ok();
  }

  async delete({ id }: Tournament): Promise<Result<void, NotFoundError>> {
    const deleted = await this.db
      .deleteFrom('tournament')
      .where('id', '=', id)
      .executeTakeFirst();
    if (deleted.numDeletedRows === 0n) {
      return err(new NotFoundError(`Tournament with id ${id} not found`));
    }
    return ok();
  }
}

function toModel(row: {
  id: string;
  baseUrl: string;
  name: string;
  shortName: string;
  slug: string;
  tabId: number;
}): Tournament {
  return Tournament.init({
    id: TournamentId.init(row.id),
    baseUrl: row.baseUrl,
    name: row.name,
    shortName: row.shortName,
    slug: row.slug,
    tabId: row.tabId,
  });
}
