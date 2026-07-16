import { TournamentId } from '@shared/domain';
import {
  TournamentDto,
  TournamentQuery,
} from '../infrastructure/query/tournament.query';
import { ok, Result } from 'neverthrow';

export class ListTournamentsService {
  constructor(private tournamentQuery: TournamentQuery) {}

  async execute(
    tournamentIds: TournamentId[],
  ): Promise<Result<TournamentDto[], never>> {
    return ok(await this.tournamentQuery.getAll(tournamentIds));
  }
}
