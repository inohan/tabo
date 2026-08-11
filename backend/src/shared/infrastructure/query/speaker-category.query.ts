import { Db, DbSchema } from '../persistence/db';
import { InstitutionId, SpeakerCategoryId, TournamentId } from '../../domain';
import { Selectable } from 'kysely';

export type SpeakerCategoryDto = {
  tournamentId: string;

  id: number;
  name: string;
  slug: string;
  seq: number;
};

const toDto = (
  result: Selectable<DbSchema['speakerCategory']>,
): SpeakerCategoryDto => ({
  tournamentId: result.tournamentId,

  id: result.id,
  name: result.name,
  slug: result.slug,
  seq: result.seq,
});

export class SpeakerCategoryQuery {
  constructor(private db: Db) {}

  async get({
    tournamentId,
    speakerCategoryId: institutionId,
  }: {
    tournamentId: TournamentId;
    speakerCategoryId: SpeakerCategoryId;
  }): Promise<SpeakerCategoryDto | undefined> {
    const queryResult = await this.db
      .selectFrom('speakerCategory')
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
    speakerCategoryIds: institutionIds,
  }: {
    tournamentId: TournamentId;
    speakerCategoryIds: InstitutionId[];
  }): Promise<SpeakerCategoryDto[]> {
    if (institutionIds.length === 0) {
      return [];
    }
    const queryResults = await this.db
      .selectFrom('speakerCategory')
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
  }): Promise<SpeakerCategoryDto[]> {
    const queryResults = await this.db
      .selectFrom('speakerCategory')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .orderBy('id')
      .execute();
    return queryResults.map(toDto);
  }
}
