import { NotFoundError, SaveFailedError, TournamentId } from '@shared/domain';
import { Result } from 'neverthrow';
import { ImportSession } from '../models/import-session';

export abstract class ImportSessionRepositoryPort {
  abstract get(id: {
    tournamentId: TournamentId;
    type: 'team' | 'adjudicator';
  }): Promise<Result<ImportSession, NotFoundError>>;

  /**
   * Upserts a new import session. Fails if another import session with the same (tournamentId, type) exists.
   * @param importSession The import session to upsert.
   */
  abstract save(
    importSession: ImportSession,
  ): Promise<Result<void, SaveFailedError>>;

  abstract delete(
    importSession: ImportSession,
  ): Promise<Result<void, NotFoundError>>;
}
