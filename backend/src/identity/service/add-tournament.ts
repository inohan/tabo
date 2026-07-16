import { ok, Result } from 'neverthrow';
import { IdentityDb } from '../infrastructure/persistence/db';

export class AddOrganizationTournamentService {
  constructor(private db: IdentityDb) {}

  async execute({
    organizationId,
    tournamentId,
  }: {
    organizationId: string;
    tournamentId: string;
  }): Promise<Result<void, never>> {
    await this.db
      .insertInto('tournament')
      .values({ organizationId, tournamentId })
      .onConflict((oc) =>
        oc.columns(['organizationId', 'tournamentId']).doNothing(),
      )
      .executeTakeFirst();
    return ok();
  }
}
