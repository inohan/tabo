import { Institution, InstitutionId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export interface InstitutionRepositoryPort {
  get: (id: {
    tournamentId: TournamentId;
    institutionId: InstitutionId;
  }) => Promise<Result<Institution, NotFoundError>>;
  getByTournament: (
    tournamentId: TournamentId,
  ) => Promise<Result<Institution[], never>>;
  save: (institution: Institution) => Promise<Result<void, SaveFailedError>>;
  delete: (institution: Institution) => Promise<Result<void, NotFoundError>>;
}
