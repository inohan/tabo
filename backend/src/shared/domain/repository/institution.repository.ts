import { Institution, InstitutionId, TournamentId } from '../models';
import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';

export abstract class InstitutionRepositoryPort {
  abstract get(id: {
    tournamentId: TournamentId;
    institutionId: InstitutionId;
  }): Promise<Result<Institution, NotFoundError>>;
  abstract getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<Institution[], never>>;
  abstract save(
    institution: Institution,
  ): Promise<Result<void, SaveFailedError>>;
  abstract delete(
    institution: Institution,
  ): Promise<Result<void, NotFoundError>>;
}
