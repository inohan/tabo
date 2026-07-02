import { Adjudicator, AdjudicatorId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export interface AdjudicatorRepositoryPort {
  get: (id: {
    tournamentId: TournamentId;
    adjudicatorId: AdjudicatorId;
  }) => Promise<Result<Adjudicator, NotFoundError>>;
  getByTournament: (
    tournamentId: TournamentId,
  ) => Promise<Result<Adjudicator[], never>>;
  save: (adjudicator: Adjudicator) => Promise<Result<void, SaveFailedError>>;
  delete: (adjudicator: Adjudicator) => Promise<Result<void, NotFoundError>>;
}
