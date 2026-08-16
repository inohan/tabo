import { TeamImportSessionId } from '@importer/domain/models';
import {
  TeamImportSessionDto,
  TeamImportSessionQuery,
} from '../infrastructure/query/team-import-session.query';
import { err, ok, Result } from 'neverthrow';
import { NotFoundError, TournamentId } from '@shared/domain';

export class GetTeamImportSessionService {
  constructor(private teamImportSessionQuery: TeamImportSessionQuery) {}

  async execute(
    tournamentId: TournamentId,
    teamImportSessionId: TeamImportSessionId,
  ): Promise<Result<TeamImportSessionDto, NotFoundError>> {
    const session = await this.teamImportSessionQuery.get({
      tournamentId,
      teamImportSessionId,
    });
    if (session === undefined) {
      return err(new NotFoundError());
    }
    return ok(session);
  }
}
