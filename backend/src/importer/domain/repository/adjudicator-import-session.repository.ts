import { NotFoundError, SaveFailedError, TournamentId } from '@shared/domain';
import { Result } from 'neverthrow';
import {
  AdjudicatorImportSession,
  AdjudicatorImportSessionId,
} from '../models';

export abstract class AdjudicatorImportSessionRepositoryPort {
  abstract get(input: {
    tournamentId: TournamentId;
    importSessionId: AdjudicatorImportSessionId;
  }): Promise<Result<AdjudicatorImportSession, NotFoundError>>;

  abstract getByTournament(id: {
    tournamentId: TournamentId;
  }): Promise<Result<AdjudicatorImportSession[], never>>;

  /**
   * Upserts a new import session. Fails if another import session with the same (tournamentId, type) exists.
   * @param importSession The import session to upsert.
   */
  abstract save(
    importSession: AdjudicatorImportSession,
  ): Promise<Result<void, SaveFailedError>>;

  abstract delete(
    importSession: AdjudicatorImportSession,
  ): Promise<Result<void, NotFoundError>>;
}
