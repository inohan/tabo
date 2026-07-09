import { Adjudicator, AdjudicatorId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export abstract class AdjudicatorRepositoryPort {
  abstract get(id: {
    tournamentId: TournamentId;
    adjudicatorId: AdjudicatorId;
  }): Promise<Result<Adjudicator, NotFoundError>>;
  abstract getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<Adjudicator[], never>>;
  abstract save(
    adjudicator: Adjudicator,
  ): Promise<Result<void, SaveFailedError>>;
  abstract delete(
    adjudicator: Adjudicator,
  ): Promise<Result<void, NotFoundError>>;
}
