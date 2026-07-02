import { SpeakerCategory, SpeakerCategoryId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export interface SpeakerCategoryRepositoryPort {
  get: (id: {
    tournamentId: TournamentId;
    speakerCategoryId: SpeakerCategoryId;
  }) => Promise<Result<SpeakerCategory, NotFoundError>>;
  getByTournament: (
    tournamentId: TournamentId,
  ) => Promise<Result<SpeakerCategory[], never>>;
  save: (
    speakerCategory: SpeakerCategory,
  ) => Promise<Result<void, SaveFailedError>>;
  delete: (
    speakerCategory: SpeakerCategory,
  ) => Promise<Result<void, NotFoundError>>;
}
