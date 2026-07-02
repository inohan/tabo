import { BreakCategory, BreakCategoryId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export interface BreakCategoryRepositoryPort {
  get: (id: {
    tournamentId: TournamentId;
    breakCategoryId: BreakCategoryId;
  }) => Promise<Result<BreakCategory, NotFoundError>>;
  getByTournament: (
    tournamentId: TournamentId,
  ) => Promise<Result<BreakCategory[], never>>;
  save: (
    breakCategory: BreakCategory,
  ) => Promise<Result<void, SaveFailedError>>;
  delete: (
    breakCategory: BreakCategory,
  ) => Promise<Result<void, NotFoundError>>;
}
