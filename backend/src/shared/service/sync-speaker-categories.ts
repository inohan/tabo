import { ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort, TabbycatError } from '../clients/tabbycat';
import {
  NotFoundError,
  SaveFailedError,
  SpeakerCategory,
  SpeakerCategoryId,
  TournamentId,
} from '../domain';
import { TournamentRepositoryPort, UnitOfWorkPort } from '../domain/repository';

export class SyncSpeakerCategoriesService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly unitOfWork: UnitOfWorkPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
  ): ResultAsync<void, NotFoundError | TabbycatError | SaveFailedError> {
    return safeTry(
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
          yield* await tcClient.listSpeakerCategories();
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
            yield* await speakerCategoryRepository.deleteMany(
              oldSpeakerCategories.filter(
                (sc) => !syncedSpeakerCategoryIdSet.has(sc.id),
              ),
            );
            // Update/create new speaker categories
            return await speakerCategoryRepository.saveMany(
              syncedSpeakerCategoryDtos.map((dto) =>
                SpeakerCategory.fromDto(
                  dto,
                  tournamentId,
                  oldSpeakerCategoriesMap.get(dto.id),
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
