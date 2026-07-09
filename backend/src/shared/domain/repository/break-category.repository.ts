import { BreakCategory, BreakCategoryId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export abstract class BreakCategoryRepositoryPort {
  abstract get(id: {
    tournamentId: TournamentId;
    breakCategoryId: BreakCategoryId;
  }): Promise<Result<BreakCategory, NotFoundError>>;
  abstract getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<BreakCategory[], never>>;
  abstract save(
    breakCategory: BreakCategory,
  ): Promise<Result<void, SaveFailedError>>;
  abstract delete(
    breakCategory: BreakCategory,
  ): Promise<Result<void, NotFoundError>>;
}
