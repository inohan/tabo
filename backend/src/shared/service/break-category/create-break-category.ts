import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort, BreakCategoryDTO } from '../../clients/tabbycat';
import {
  BreakCategory,
  NotFoundError,
  PartialFailedError,
  TournamentId,
} from '../../domain';
import {
  BreakCategoryRepositoryPort,
  TournamentRepositoryPort,
} from '../../domain/repository';
import { safeTry, ok, err } from 'neverthrow';
import { throw_ } from 'src/lib/throw';

export class CreateBreakCategoryService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly breakCategoryRepository: BreakCategoryRepositoryPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
    breakCategory: PickUnbranded<
      BreakCategory,
      'name' | 'slug' | 'seq' | 'breakSize' | 'isGeneral' | 'priority'
    >,
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateBreakCategoryService) {
        const tournament =
          yield* await this.tournamentRepository.get(tournamentId);
        if (tournament === undefined) {
          return err(
            new NotFoundError(`Tournament ${tournamentId} does not exist`),
          );
        }
        const { baseUrl, token, slug: tournamentSlug } = tournament;
        const tcClient = this.tabbycatClientFactory({
          baseUrl,
          token,
          tournamentSlug,
        });
        const breakCategoryDTO =
          yield* await tcClient.createBreakCategory(breakCategory);
        if (option?.sync ?? true) {
          const syncResult = await this.sync(tournamentId, breakCategoryDTO);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }
        return ok(breakCategoryDTO.id);
      }.bind(this),
    );
  }

  executeMany(
    tournamentId: TournamentId,
    breakCategories: PickUnbranded<
      BreakCategory,
      'name' | 'slug' | 'seq' | 'breakSize' | 'isGeneral' | 'priority'
    >[],
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateBreakCategoryService) {
        const tournament =
          yield* await this.tournamentRepository.get(tournamentId);
        if (tournament === undefined) {
          return err(
            new NotFoundError(`Tournament ${tournamentId} does not exist`),
          );
        }
        const { baseUrl, token, slug: tournamentSlug } = tournament;
        const tcClient = this.tabbycatClientFactory({
          baseUrl,
          token,
          tournamentSlug,
        });
        const breakCategoryDTOs = await Promise.all(
          breakCategories.map((breakCategory) =>
            tcClient.createBreakCategory(breakCategory),
          ),
        );
        // Save only successful results
        if (option?.sync ?? true) {
          const syncResult = await this.syncMany(
            tournamentId,
            breakCategoryDTOs
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

        const results = breakCategoryDTOs.map((res) =>
          res.map((dto) => dto.id),
        );
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

  private sync(tournamentId: TournamentId, breakCategoryDTO: BreakCategoryDTO) {
    return this.breakCategoryRepository.save(
      BreakCategory.fromDto(breakCategoryDTO, tournamentId),
    );
  }

  private syncMany(
    tournamentId: TournamentId,
    breakCategoryDTOs: BreakCategoryDTO[],
  ) {
    return this.breakCategoryRepository.saveMany(
      breakCategoryDTOs.map((breakCategoryDTO) =>
        BreakCategory.fromDto(breakCategoryDTO, tournamentId),
      ),
    );
  }
}
