import { Tournament, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export interface TournamentRepositoryPort {
  get: (id: TournamentId) => Promise<Result<Tournament, NotFoundError>>;
  save: (tournament: Tournament) => Promise<Result<void, SaveFailedError>>;
  delete: (tournament: Tournament) => Promise<Result<void, NotFoundError>>;
}
