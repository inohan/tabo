import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort } from '../client/client-port';
import { SpeakerCategory, TournamentId } from '../domain';
import {
  SpeakerCategoryRepositoryPort,
  TournamentRepositoryPort,
} from '../domain/repository';
import { safeTry, ok } from 'neverthrow';
import { SpeakerCategoryDTO } from '../client/output-dto';

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
          const syncResult = await this.sync(speakerCategoryDTO, tournamentId);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }
        return ok(speakerCategoryDTO.id);
      }.bind(this),
    );
  }

  private sync(
    speakerCategoryDTO: SpeakerCategoryDTO,
    tournamentId: TournamentId,
  ) {
    const speakerCategoryEntity = SpeakerCategory.init({
      tournamentId,
      id: speakerCategoryDTO.id,
      name: speakerCategoryDTO.name,
      slug: speakerCategoryDTO.slug,
      seq: speakerCategoryDTO.seq,
    });
    return this.speakerCategoryRepository.save(speakerCategoryEntity);
  }
}
