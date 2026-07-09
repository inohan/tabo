import { SpeakerCategory, SpeakerCategoryId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export abstract class SpeakerCategoryRepositoryPort {
  abstract get(id: {
    tournamentId: TournamentId;
    speakerCategoryId: SpeakerCategoryId;
  }): Promise<Result<SpeakerCategory, NotFoundError>>;
  abstract getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<SpeakerCategory[], never>>;
  abstract save(
    speakerCategory: SpeakerCategory,
  ): Promise<Result<void, SaveFailedError>>;
  abstract delete(
    speakerCategory: SpeakerCategory,
  ): Promise<Result<void, NotFoundError>>;
}
