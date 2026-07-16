import { ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort } from '../client/client-port';
import {
  BreakCategory,
  BreakCategoryId,
  NotFoundError,
  SaveFailedError,
  TournamentId,
} from '../domain';
import { TournamentRepositoryPort, UnitOfWorkPort } from '../domain/repository';
import { TabbycatError } from '../client/error';

export class SyncBreakCategoriesService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly unitOfWork: UnitOfWorkPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
  ): ResultAsync<void, NotFoundError | TabbycatError | SaveFailedError> {
    return safeTry(
      async function* (this: SyncBreakCategoriesService) {
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
        const syncedBreakCategoryDtos =
          yield* await tcClient.listBreakCategories();
        const syncedBreakCategoryIdSet = new Set(
          syncedBreakCategoryDtos.map((bc) => bc.id),
        );
        yield* await this.unitOfWork.run(({ breakCategoryRepository }) =>
          safeTry<void, NotFoundError | SaveFailedError>(async function* () {
            const oldBreakCategories =
              yield* await breakCategoryRepository.getByTournament(
                tournamentId,
              );
            const oldBreakCategoriesMap = new Map<
              BreakCategoryId,
              BreakCategory
            >(oldBreakCategories.map((bc) => [bc.id, bc]));
            // Delete nonexistent break categories from cache table
            for (const bc of oldBreakCategories.filter(
              (bc) => !syncedBreakCategoryIdSet.has(bc.id),
            )) {
              yield* await breakCategoryRepository.delete(bc);
            }
            // Update/create new break categories
            for (const dto of syncedBreakCategoryDtos) {
              const foundBreakCategory = oldBreakCategoriesMap.get(dto.id);
              if (foundBreakCategory !== undefined) {
                const updatedBreakCategory = BreakCategory.init({
                  tournamentId: foundBreakCategory.tournamentId,
                  ...dto,
                });
                yield* await breakCategoryRepository.save(updatedBreakCategory);
              } else {
                yield* await breakCategoryRepository.save(
                  BreakCategory.init({
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
