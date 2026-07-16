import { NotFoundError, TournamentId } from '@shared/domain';
import {
  TournamentDto,
  TournamentQuery,
} from '../infrastructure/query/tournament.query';
import { Result, err, ok } from 'neverthrow';

export class GetTournamentService {
  constructor(private tournamentQuery: TournamentQuery) {}

  async execute(
    tournamentId: TournamentId,
  ): Promise<Result<TournamentDto, NotFoundError>> {
    const result = await this.tournamentQuery.get(tournamentId);
    if (result === undefined) {
      return err(new NotFoundError());
    }
    return ok(result);
  }
}
