import { err, ok, Result } from 'neverthrow';
import { InstitutionId, NotFoundError, TournamentId } from '../domain';
import { InstitutionQuery, InstitutionDto } from '../infrastructure/query';

export class GetInstitutionService {
  constructor(private institutionQuery: InstitutionQuery) {}

  async execute(
    tournamentId: TournamentId,
    institutionId: InstitutionId,
  ): Promise<Result<InstitutionDto, NotFoundError>> {
    const result = await this.institutionQuery.get({
      tournamentId,
      institutionId,
    });
    if (result === undefined) {
      return err(new NotFoundError());
    }
    return ok(result);
  }
}
