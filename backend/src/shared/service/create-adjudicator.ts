import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort } from '../client/client-port';
import { Adjudicator, TournamentId } from '../domain';
import {
  AdjudicatorRepositoryPort,
  TournamentRepositoryPort,
} from '../domain/repository';
import { safeTry, ok } from 'neverthrow';
import { AdjudicatorDTO } from '../client/output-dto';

export class CreateAdjudicatorService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly adjudicatorRepository: AdjudicatorRepositoryPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
    adjudicator: PickUnbranded<Adjudicator, 'name' | 'institutionId'>,
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateAdjudicatorService) {
        const {
          baseUrl,
          token,
          slug: tournamentSlug,
        } = yield* await this.tournamentRepository.get(tournamentId);
        const tcClient = this.tabbycatClientFactory({
          baseUrl,
          token,
          tournamentSlug,
        });
        const adjudicatorDTO =
          yield* await tcClient.createAdjudicator(adjudicator);
        if (option?.sync ?? true) {
          const syncResult = await this.sync(adjudicatorDTO, tournamentId);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }
        return ok(adjudicatorDTO.id);
      }.bind(this),
    );
  }

  private sync(adjudicatorDTO: AdjudicatorDTO, tournamentId: TournamentId) {
    const adjudicatorEntity = Adjudicator.init({
      tournamentId,
      id: adjudicatorDTO.id,
      name: adjudicatorDTO.name,
      institutionId: adjudicatorDTO.institutionId,
      breaking: adjudicatorDTO.breaking,
      independent: adjudicatorDTO.independent,
      adjCore: adjudicatorDTO.adjCore,
      institutionConflicts: adjudicatorDTO.institutionConflicts,
      teamConflicts: adjudicatorDTO.teamConflicts,
      adjudicatorConflicts: adjudicatorDTO.adjudicatorConflicts,
    });
    return this.adjudicatorRepository.save(adjudicatorEntity);
  }
}
