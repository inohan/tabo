import { Db } from '../persistence/db';
import { InstitutionId, TournamentId } from '../../domain';

export type InstitutionDto = {
  tournamentId: string;
  tabbycatInfo: {
    id: number;
    name: string;
    code: string;
  };
};

export class InstitutionQuery {
  constructor(private db: Db) {}

  async get({
    tournamentId,
    institutionId,
  }: {
    tournamentId: TournamentId;
    institutionId: InstitutionId;
  }): Promise<InstitutionDto | undefined> {
    const queryResult = await this.db
      .selectFrom('institution')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', institutionId)
      .executeTakeFirst();
    if (queryResult === undefined) {
      return undefined;
    }
    return {
      tournamentId: queryResult.tournamentId,
      tabbycatInfo: {
        id: queryResult.id,
        name: queryResult.name,
        code: queryResult.code,
      },
    };
  }

  async getAll({
    tournamentId,
    institutionIds,
  }: {
    tournamentId: TournamentId;
    institutionIds: InstitutionId[];
  }): Promise<InstitutionDto[]> {
    if (institutionIds.length === 0) {
      return [];
    }
    const queryResults = await this.db
      .selectFrom('institution')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', 'in', institutionIds)
      .orderBy('id')
      .execute();
    return queryResults.map((queryResult) => ({
      tournamentId: queryResult.tournamentId,
      tabbycatInfo: {
        id: queryResult.id,
        name: queryResult.name,
        code: queryResult.code,
      },
    }));
  }

  async getByTournamentId({
    tournamentId,
  }: {
    tournamentId: TournamentId;
  }): Promise<InstitutionDto[]> {
    const queryResults = await this.db
      .selectFrom('institution')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .orderBy('id')
      .execute();
    return queryResults.map((queryResult) => ({
      tournamentId: queryResult.tournamentId,
      tabbycatInfo: {
        id: queryResult.id,
        name: queryResult.name,
        code: queryResult.code,
      },
    }));
  }
}
