import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort, SpeakerCategoryDTO } from '../clients/tabbycat';
import { PartialFailedError, SpeakerCategory, TournamentId } from '../domain';
import {
  SpeakerCategoryRepositoryPort,
  TournamentRepositoryPort,
} from '../domain/repository';
import { safeTry, ok, err } from 'neverthrow';
import { throw_ } from 'src/lib/throw';

export class CreateSpeakerCategoryService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly speakerCategoryRepository: SpeakerCategoryRepositoryPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
    speakerCategory: PickUnbranded<SpeakerCategory, 'name' | 'slug' | 'seq'>,
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateSpeakerCategoryService) {
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
        const speakerCategoryDTO =
          yield* await tcClient.createSpeakerCategory(speakerCategory);
        if (option?.sync ?? true) {
          const syncResult = await this.sync(tournamentId, speakerCategoryDTO);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }
        return ok(speakerCategoryDTO.id);
      }.bind(this),
    );
  }

  executeMany(
    tournamentId: TournamentId,
    speakerCategories: PickUnbranded<
      SpeakerCategory,
      'name' | 'slug' | 'seq'
    >[],
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateSpeakerCategoryService) {
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
        const speakerCategoryDTOs = await Promise.all(
          speakerCategories.map((speakerCategory) =>
            tcClient.createSpeakerCategory(speakerCategory),
          ),
        );
        // Save only successful results
        if (option?.sync ?? true) {
          const syncResult = await this.syncMany(
            tournamentId,
            speakerCategoryDTOs
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

        const results = speakerCategoryDTOs.map((res) =>
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

  private sync(
    tournamentId: TournamentId,
    speakerCategoryDTO: SpeakerCategoryDTO,
  ) {
    return this.speakerCategoryRepository.save(
      SpeakerCategory.fromDto(speakerCategoryDTO, tournamentId),
    );
  }

  private syncMany(
    tournamentId: TournamentId,
    speakerCategoryDTOs: SpeakerCategoryDTO[],
  ) {
    return this.speakerCategoryRepository.saveMany(
      speakerCategoryDTOs.map((speakerCategoryDTO) =>
        SpeakerCategory.fromDto(speakerCategoryDTO, tournamentId),
      ),
    );
  }
}
