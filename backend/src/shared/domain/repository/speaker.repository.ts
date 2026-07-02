import { Speaker, SpeakerId, TeamId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export interface SpeakerRepositoryPort {
  get: (id: {
    tournamentId: TournamentId;
    speakerId: SpeakerId;
  }) => Promise<Result<Speaker, NotFoundError>>;
  getByTournament: (
    tournamentId: TournamentId,
  ) => Promise<Result<Speaker[], never>>;
  getByTeam: (id: {
    tournamentId: TournamentId;
    teamId: TeamId;
  }) => Promise<Result<Speaker[], never>>;
  save: (speaker: Speaker) => Promise<Result<void, SaveFailedError>>;
  delete: (speaker: Speaker) => Promise<Result<void, NotFoundError>>;
}
