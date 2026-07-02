import { Team, TeamId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export interface TeamRepositoryPort {
  get: (id: {
    tournamentId: TournamentId;
    teamId: TeamId;
  }) => Promise<Result<Team, NotFoundError>>;
  getByTournament: (
    tournamentId: TournamentId,
  ) => Promise<Result<Team[], never>>;
  save: (team: Team) => Promise<Result<void, SaveFailedError>>;
  delete: (team: Team) => Promise<Result<void, NotFoundError>>;
}
