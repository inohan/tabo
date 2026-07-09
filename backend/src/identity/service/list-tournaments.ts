import { IdentityDb } from '../infrastructure/persistence/db';

export class ListTournamentService {
  constructor(private db: IdentityDb) {}

  async execute({
    organizationId,
  }: {
    organizationId: string;
  }): Promise<string[]> {
    const tournaments = await this.db
      .selectFrom('tournament')
      .select('tournamentId')
      .where('organizationId', '=', organizationId)
      .execute();
    return tournaments.map((t) => t.tournamentId);
  }
}
