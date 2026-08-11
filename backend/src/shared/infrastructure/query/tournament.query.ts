import { Db, DbSchema } from '../persistence/db';
import { TournamentId } from '../../domain';
import { Selectable } from 'kysely';

export type TournamentDto = {
  tournamentId: string;
  baseUrl: string;
  id: number;
  slug: string;
  name: string;
  shortName: string;
};

const toDto = (result: Selectable<DbSchema['tournament']>): TournamentDto => ({
  tournamentId: result.tournamentId,
  baseUrl: result.baseUrl,
  id: result.id,
  slug: result.slug,
  name: result.name,
  shortName: result.shortName,
});

export class TournamentQuery {
  constructor(private db: Db) {}

  async get(tournamentId: TournamentId): Promise<TournamentDto | undefined> {
    const queryResult = await this.db
      .selectFrom('tournament')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .executeTakeFirst();
    if (queryResult === undefined) {
      return undefined;
    }
    return toDto(queryResult);
  }
  async getAll(tournamentIds: TournamentId[]): Promise<TournamentDto[]> {
    if (tournamentIds.length === 0) {
      return [];
    }
    const queryResults = await this.db
      .selectFrom('tournament')
      .selectAll()
      .where('tournamentId', 'in', tournamentIds)
      .orderBy('createdAt')
      .execute();
    return queryResults.map(toDto);
  }
}
