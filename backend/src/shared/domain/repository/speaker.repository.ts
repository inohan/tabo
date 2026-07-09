import { Speaker, SpeakerId, TeamId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export abstract class SpeakerRepositoryPort {
  abstract get(id: {
    tournamentId: TournamentId;
    speakerId: SpeakerId;
  }): Promise<Result<Speaker, NotFoundError>>;
  abstract getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<Speaker[], never>>;
  abstract getByTeam(id: {
    tournamentId: TournamentId;
    teamId: TeamId;
  }): Promise<Result<Speaker[], never>>;
  abstract save(speaker: Speaker): Promise<Result<void, SaveFailedError>>;
  abstract delete(speaker: Speaker): Promise<Result<void, NotFoundError>>;
}
