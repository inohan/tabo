import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort, AdjudicatorDTO } from '../clients/tabbycat';
import { Adjudicator, PartialFailedError, TournamentId } from '../domain';
import {
  AdjudicatorRepositoryPort,
  TournamentRepositoryPort,
} from '../domain/repository';
import { safeTry, ok, err } from 'neverthrow';
import { throw_ } from 'src/lib/throw';

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
          const syncResult = await this.sync(tournamentId, adjudicatorDTO);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }
        return ok(adjudicatorDTO.id);
      }.bind(this),
    );
  }

  executeMany(
    tournamentId: TournamentId,
    adjudicators: PickUnbranded<Adjudicator, 'name' | 'institutionId'>[],
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
        const adjudicatorDTOs = await Promise.all(
          adjudicators.map((adjudicator) =>
            tcClient.createAdjudicator(adjudicator),
          ),
        );
        // Save only successful results
        if (option?.sync ?? true) {
          const syncResult = await this.syncMany(
            tournamentId,
            adjudicatorDTOs
              .filter((result) => result.isOk())
              .map((result) =>
                result.match(
                  (ok) => ok,
                  () => throw_(new Error()),
                ),
              ),
          );
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }

        const results = adjudicatorDTOs.map((res) => res.map((dto) => dto.id));
        if (results.every((res) => res.isOk())) {
          return ok(
            results.map((res) =>
              res.match(
                (ok) => ok,
                () => throw_(new Error()),
              ),
            ),
          );
        }
        return yield* err(new PartialFailedError(results));
      }.bind(this),
    );
  }

  private sync(tournamentId: TournamentId, adjudicatorDTO: AdjudicatorDTO) {
    return this.adjudicatorRepository.save(
      Adjudicator.fromDto(adjudicatorDTO, tournamentId),
    );
  }

  private syncMany(
    tournamentId: TournamentId,
    adjudicatorDTOs: AdjudicatorDTO[],
  ) {
    return this.adjudicatorRepository.saveMany(
      adjudicatorDTOs.map((adjudicatorDTO) =>
        Adjudicator.fromDto(adjudicatorDTO, tournamentId),
      ),
    );
  }
}
