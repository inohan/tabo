import { ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort } from '../client/client-port';
import {
  NotFoundError,
  SaveFailedError,
  SpeakerCategory,
  SpeakerCategoryId,
  TournamentId,
} from '../domain';
import {
  TournamentRepositoryPort,
  TransactionError,
  UnitOfWorkPort,
} from '../domain/repository';
import { TabbycatError } from '../client/error';

export class SyncSpeakerCategoriesService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly unitOfWork: UnitOfWorkPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
  ): ResultAsync<
    void,
    NotFoundError | TabbycatError | SaveFailedError | TransactionError
  > {
    return safeTry<
      void,
      NotFoundError | TabbycatError | SaveFailedError | TransactionError
    >(
      async function* (this: SyncSpeakerCategoriesService) {
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
        const syncedSpeakerCategoryDtos =
          yield* await tcClient.speakerCategories.list();
        const syncedSpeakerCategoryIdSet = new Set(
          syncedSpeakerCategoryDtos.map((sc) => sc.id),
        );
        yield* await this.unitOfWork.run(({ speakerCategoryRepository }) =>
          safeTry<void, NotFoundError | SaveFailedError>(async function* () {
            const oldSpeakerCategories =
              yield* await speakerCategoryRepository.getByTournament(
                tournamentId,
              );
            const oldSpeakerCategoriesMap = new Map<
              SpeakerCategoryId,
              SpeakerCategory
            >(oldSpeakerCategories.map((sc) => [sc.id, sc]));
            // Delete nonexistent speaker categories from cache table
            for (const sc of oldSpeakerCategories.filter(
              (sc) => !syncedSpeakerCategoryIdSet.has(sc.id),
            )) {
              yield* await speakerCategoryRepository.delete(sc);
            }
            // Update/create new speaker categories
            for (const dto of syncedSpeakerCategoryDtos) {
              const foundSpeakerCategory = oldSpeakerCategoriesMap.get(dto.id);
              if (foundSpeakerCategory !== undefined) {
                const updateSpeakerCategory = SpeakerCategory.init({
                  tournamentId: foundSpeakerCategory.tournamentId,
                  ...dto,
                });
                yield* await speakerCategoryRepository.save(
                  updateSpeakerCategory,
                );
              } else {
                yield* await speakerCategoryRepository.save(
                  SpeakerCategory.init({
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
