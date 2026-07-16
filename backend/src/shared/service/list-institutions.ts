import { TournamentId } from '../domain';
import { InstitutionDto, InstitutionQuery } from '../infrastructure/query';
import { ok, Result } from 'neverthrow';

export class ListInstitutionsService {
  constructor(private institutionQuery: InstitutionQuery) {}

  async execute(
    tournamentId: TournamentId,
  ): Promise<Result<InstitutionDto[], never>> {
    return ok(await this.institutionQuery.getByTournamentId({ tournamentId }));
  }
}
