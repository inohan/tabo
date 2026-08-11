import { Db, DbSchema } from '../persistence/db';
import { BreakCategoryId, InstitutionId, TournamentId } from '../../domain';
import { Selectable } from 'kysely';

export type BreakCategoryDto = {
  tournamentId: string;

  id: number;
  name: string;
  slug: string;
  seq: number;
  breakSize: number;
  reserveSize: number;
  isGeneral: boolean;
  priority: number;
};

const toDto = (
  result: Selectable<DbSchema['breakCategory']>,
): BreakCategoryDto => ({
  tournamentId: result.tournamentId,

  id: result.id,
  name: result.name,
  slug: result.slug,
  seq: result.seq,
  breakSize: result.breakSize,
  reserveSize: result.reserveSize,
  isGeneral: result.isGeneral,
  priority: result.priority,
});

export class BreakCategoryQuery {
  constructor(private db: Db) {}

  async get({
    tournamentId,
    breakCategoryId: institutionId,
  }: {
    tournamentId: TournamentId;
    breakCategoryId: BreakCategoryId;
  }): Promise<BreakCategoryDto | undefined> {
    const queryResult = await this.db
      .selectFrom('breakCategory')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', institutionId)
      .executeTakeFirst();
    if (queryResult === undefined) {
      return undefined;
    }
    return toDto(queryResult);
  }

  async getAll({
    tournamentId,
    breakCategoryIds: institutionIds,
  }: {
    tournamentId: TournamentId;
    breakCategoryIds: InstitutionId[];
  }): Promise<BreakCategoryDto[]> {
    if (institutionIds.length === 0) {
      return [];
    }
    const queryResults = await this.db
      .selectFrom('breakCategory')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', 'in', institutionIds)
      .orderBy('id')
      .execute();
    return queryResults.map(toDto);
  }

  async getByTournamentId({
    tournamentId,
  }: {
    tournamentId: TournamentId;
  }): Promise<BreakCategoryDto[]> {
    const queryResults = await this.db
      .selectFrom('breakCategory')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .orderBy('id')
      .execute();
    return queryResults.map(toDto);
  }
}
