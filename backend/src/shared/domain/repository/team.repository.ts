import { Team, TeamId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export abstract class TeamRepositoryPort {
  abstract get(id: {
    tournamentId: TournamentId;
    teamId: TeamId;
  }): Promise<Result<Team, NotFoundError>>;
  abstract getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<Team[], never>>;
  abstract save(team: Team): Promise<Result<void, SaveFailedError>>;
  abstract delete(team: Team): Promise<Result<void, NotFoundError>>;
}
