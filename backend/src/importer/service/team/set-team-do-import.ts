import {
  TeamImportSession,
  TeamImportSessionId,
} from '@importer/domain/models';
import { TeamImportSessionRepositoryPort } from '@importer/domain/repository';
import { NotFoundError, TournamentId } from '@shared/domain';
import { err, safeTry } from 'neverthrow';

export class SetTeamDoImportStatusService {
  constructor(
    private teamImportSessionRepository: TeamImportSessionRepositoryPort,
  ) {}

  async execute({
    tournamentId,
    importSessionId,
    updates,
  }: {
    tournamentId: TournamentId;
    importSessionId: TeamImportSessionId;
    updates: { index: number; doImport: boolean }[];
  }) {
    return await safeTry(
      async function* (this: SetTeamDoImportStatusService) {
        const importSession = yield* await this.teamImportSessionRepository.get(
          { tournamentId, importSessionId },
        );
        if (importSession === undefined) {
          return err(
            new NotFoundError(
              `Team import session ${importSessionId} not found.`,
            ),
          );
        }
        const updated = yield* TeamImportSession.updateDoImport(
          importSession,
          updates,
        );
        return await this.teamImportSessionRepository.save(updated);
      }.bind(this),
    );
  }
}
