import { NotFoundError, SaveFailedError, TournamentId } from '@shared/domain';
import { Result } from 'neverthrow';
import { TeamImportSession, TeamImportSessionId } from '../models';

export abstract class TeamImportSessionRepositoryPort {
  abstract get(input: {
    tournamentId: TournamentId;
    importSessionId: TeamImportSessionId;
  }): Promise<Result<TeamImportSession, NotFoundError>>;

  abstract getByTournament(id: {
    tournamentId: TournamentId;
  }): Promise<Result<TeamImportSession[], never>>;

  /**
   * Upserts a new import session. Fails if another import session with the same (tournamentId, type) exists.
   * @param importSession The import session to upsert.
   */
  abstract save(
    importSession: TeamImportSession,
  ): Promise<Result<void, SaveFailedError>>;

  abstract delete(
    importSession: TeamImportSession,
  ): Promise<Result<void, NotFoundError>>;
}
