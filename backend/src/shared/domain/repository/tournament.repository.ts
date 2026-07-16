import { Tournament, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export abstract class TournamentRepositoryPort {
  abstract get(
    tournamentId: TournamentId,
  ): Promise<Result<Tournament, NotFoundError>>;
  abstract save(tournament: Tournament): Promise<Result<void, SaveFailedError>>;
  abstract delete(tournament: Tournament): Promise<Result<void, NotFoundError>>;
}
