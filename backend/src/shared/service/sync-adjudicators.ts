import { ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort } from '../client/client-port';
import {
  Adjudicator,
  AdjudicatorId,
  NotFoundError,
  SaveFailedError,
  TournamentId,
} from '../domain';
import { TournamentRepositoryPort, UnitOfWorkPort } from '../domain/repository';
import { TabbycatError } from '../client/error';

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
            for (const adjudicator of oldAdjudicators.filter(
              (adjudicator) => !syncedAdjudicatorIdSet.has(adjudicator.id),
            )) {
              yield* await adjudicatorRepository.delete(adjudicator);
            }
            // Update/create new adjudicators
            for (const dto of syncedAdjudicatorDtos) {
              const foundAdjudicator = oldAdjudicatorsMap.get(dto.id);
              if (foundAdjudicator !== undefined) {
                const updatedAdjudicator = Adjudicator.init({
                  tournamentId: foundAdjudicator.tournamentId,
                  ...dto,
                });
                yield* await adjudicatorRepository.save(updatedAdjudicator);
              } else {
                yield* await adjudicatorRepository.save(
                  Adjudicator.init({
                    tournamentId: tournamentId,
                    ...dto,
                  }),
                );
              }
            }
            return ok();
          }),
        );
        return ok();
      }.bind(this),
    );
  }
}
