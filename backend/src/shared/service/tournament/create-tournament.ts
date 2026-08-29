import { ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort, TabbycatError } from '../../clients/tabbycat';
import { SaveFailedError, Tournament, TournamentId } from '../../domain';
import { TournamentRepositoryPort } from '../../domain/repository';

export class CreateTournamentService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    baseUrl: string,
    token: string,
    tournamentSlug: string,
  ): ResultAsync<
    { tournamentId: TournamentId; slug: string; name: string },
    SaveFailedError | TabbycatError
  > {
    return safeTry<
      { tournamentId: TournamentId; slug: string; name: string },
      SaveFailedError | TabbycatError
    >(
      async function* (this: CreateTournamentService) {
        const tcClient = this.tabbycatClientFactory({
          token,
          baseUrl,
          tournamentSlug,
        });
        const { name, id, shortName } = yield* await tcClient.getTournament();
        const tournament = Tournament.create({
          baseUrl,
          name,
          id,
          shortName,
          slug: tournamentSlug,
          token,
        });
        yield* await this.tournamentRepository.save(tournament);
        return ok({
          tournamentId: tournament.tournamentId,
          slug: tournamentSlug,
          name,
        });
      }.bind(this),
    );
  }
}
