import { Db } from '../persistence/db';
import { TournamentId } from '../../domain';

export type TournamentDto = {
  id: string;
  baseUrl: string;
  tabbycatInfo: {
    id: number;
    slug: string;
    name: string;
    shortName: string;
  };
};

export class TournamentQuery {
  constructor(private db: Db) {}

  async get(tournamentId: TournamentId): Promise<TournamentDto | undefined> {
    const queryResult = await this.db
      .selectFrom('tournament')
      .select(['baseUrl', 'id', 'name', 'shortName', 'slug', 'tournamentId'])
      .where('tournamentId', '=', tournamentId)
      .executeTakeFirst();
    if (queryResult === undefined) {
      return undefined;
    }
    return {
      id: queryResult.tournamentId,
      baseUrl: queryResult.baseUrl,
      tabbycatInfo: {
        id: queryResult.id,
        slug: queryResult.slug,
        name: queryResult.name,
        shortName: queryResult.shortName,
      },
    };
  }
  async getAll(tournamentIds: TournamentId[]): Promise<TournamentDto[]> {
    if (tournamentIds.length === 0) {
      return [];
    }
    const queryResults = await this.db
      .selectFrom('tournament')
      .select(['baseUrl', 'id', 'name', 'shortName', 'slug', 'tournamentId'])
      .where('tournamentId', 'in', tournamentIds)
      .orderBy('createdAt')
      .execute();
    return queryResults.map((queryResult) => ({
      id: queryResult.tournamentId,
      baseUrl: queryResult.baseUrl,
      tabbycatInfo: {
        id: queryResult.id,
        slug: queryResult.slug,
        name: queryResult.name,
        shortName: queryResult.shortName,
      },
    }));
  }
}
