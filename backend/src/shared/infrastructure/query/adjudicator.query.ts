import { Db, DbSchema } from '../persistence/db';
import { SpeakerId, TournamentId } from '../../domain';
import { Selectable } from 'kysely';

export type AdjudicatorDto = {
  tournamentId: string;
  id: number;
  name: string;
  email: string | null;
  institution: number | null;
  breaking: boolean;
  independent: boolean;
  adjCore: boolean;
  institutionConflicts: number[];
  teamConflicts: number[];
  adjudicatorConflicts: number[];
};

const toDto = (
  result: Selectable<DbSchema['adjudicator']>,
): AdjudicatorDto => ({
  tournamentId: result.tournamentId,
  id: result.id,
  name: result.name,
  email: result.email,
  institution: result.institutionId,
  breaking: result.breaking,
  independent: result.independent,
  adjCore: result.adjCore,
  institutionConflicts: result.institutionConflicts,
  teamConflicts: result.teamConflicts,
  adjudicatorConflicts: result.adjudicatorConflicts,
});

export class AdjudicatorQuery {
  constructor(private db: Db) {}

  async get({
    tournamentId,
    adjudicatorId,
  }: {
    tournamentId: TournamentId;
    adjudicatorId: SpeakerId;
  }): Promise<AdjudicatorDto | undefined> {
    const queryResult = await this.db
      .selectFrom('adjudicator')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', adjudicatorId)
      .executeTakeFirst();
    if (queryResult === undefined) {
      return undefined;
    }
    return toDto(queryResult);
  }

  async getAll({
    tournamentId,
    adjudicatorIds: speakerIds,
  }: {
    tournamentId: TournamentId;
    adjudicatorIds: SpeakerId[];
  }): Promise<AdjudicatorDto[]> {
    if (speakerIds.length === 0) {
      return [];
    }
    const queryResults = await this.db
      .selectFrom('adjudicator')
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
  }): Promise<AdjudicatorDto[]> {
    const queryResults = await this.db
      .selectFrom('adjudicator')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .orderBy('id')
      .execute();
    return queryResults.map(toDto);
  }
}
