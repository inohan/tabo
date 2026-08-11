import { Db, DbSchema } from '../persistence/db';
import { SpeakerId, TournamentId } from '../../domain';
import { Selectable } from 'kysely';

export type SpeakerDto = {
  tournamentId: string;

  id: number;
  name: string;
  team: number;
  categories: number[];
  anonymous: boolean;
  email: string | null;

  institution: number | null;
};

const toDto = (result: Selectable<DbSchema['speaker']>): SpeakerDto => ({
  tournamentId: result.tournamentId,

  id: result.id,
  name: result.name,
  team: result.teamId,
  categories: result.categories,
  anonymous: result.anonymous,
  email: result.email,

  institution: result.institutionId,
});

export class SpeakerQuery {
  constructor(private db: Db) {}

  async get({
    tournamentId,
    speakerId,
  }: {
    tournamentId: TournamentId;
    speakerId: SpeakerId;
  }): Promise<SpeakerDto | undefined> {
    const queryResult = await this.db
      .selectFrom('speaker')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', speakerId)
      .executeTakeFirst();
    if (queryResult === undefined) {
      return undefined;
    }
    return toDto(queryResult);
  }

  async getAll({
    tournamentId,
    speakerIds,
  }: {
    tournamentId: TournamentId;
    speakerIds: SpeakerId[];
  }): Promise<SpeakerDto[]> {
    if (speakerIds.length === 0) {
      return [];
    }
    const queryResults = await this.db
      .selectFrom('speaker')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', 'in', speakerIds)
      .orderBy('id')
      .execute();
    return queryResults.map(toDto);
  }

  async getByTournamentId({
    tournamentId,
  }: {
    tournamentId: TournamentId;
  }): Promise<SpeakerDto[]> {
    const queryResults = await this.db
      .selectFrom('speaker')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .orderBy('id')
      .execute();
    return queryResults.map(toDto);
  }
}
