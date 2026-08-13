import { ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort, TabbycatError } from '../clients/tabbycat';
import {
  Adjudicator,
  AdjudicatorId,
  NotFoundError,
  SaveFailedError,
  TournamentId,
} from '../domain';
import { TournamentRepositoryPort, UnitOfWorkPort } from '../domain/repository';

export class SyncAdjudicatorsService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly unitOfWork: UnitOfWorkPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
  ): ResultAsync<void, NotFoundError | TabbycatError | SaveFailedError> {
    return safeTry(
      async function* (this: SyncAdjudicatorsService) {
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
        const syncedAdjudicatorDtos = yield* await tcClient.listAdjudicator();
        const syncedAdjudicatorIdSet = new Set(
          syncedAdjudicatorDtos.map((adjudicator) => adjudicator.id),
        );
        yield* await this.unitOfWork.run(({ adjudicatorRepository }) =>
          safeTry<void, NotFoundError | SaveFailedError>(async function* () {
            const oldAdjudicators =
              yield* await adjudicatorRepository.getByTournament(tournamentId);
            const oldAdjudicatorsMap = new Map<AdjudicatorId, Adjudicator>(
              oldAdjudicators.map((adjudicator) => [
                adjudicator.id,
                adjudicator,
              ]),
            );
            // Delete nonexistent adjudicators from cache table
            yield* await adjudicatorRepository.deleteMany(
              oldAdjudicators.filter(
                (adjudicator) => !syncedAdjudicatorIdSet.has(adjudicator.id),
              ),
            );
            // Update/create new adjudicators
            return await adjudicatorRepository.saveMany(
              syncedAdjudicatorDtos.map((dto) =>
                Adjudicator.fromDto(
                  dto,
                  tournamentId,
                  oldAdjudicatorsMap.get(dto.id),
                ),
              ),
            );
          }),
        );
        return ok();
      }.bind(this),
    );
  }
}
