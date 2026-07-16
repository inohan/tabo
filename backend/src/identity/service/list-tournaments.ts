import { ok, Result } from 'neverthrow';
import { IdentityDb } from '../infrastructure/persistence/db';

export class ListOrganizationTournamentService {
  constructor(private db: IdentityDb) {}

  async execute({
    organizationId,
  }: {
    organizationId: string;
  }): Promise<Result<string[], never>> {
    const tournaments = await this.db
      .selectFrom('tournament')
      .select('tournamentId')
      .where('organizationId', '=', organizationId)
      .execute();
    return ok(tournaments.map((t) => t.tournamentId));
  }
}
