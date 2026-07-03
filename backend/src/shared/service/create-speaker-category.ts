import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort } from '../client/client-port';
import {
  NotFoundError,
  SaveFailedError,
  SpeakerCategory,
  SpeakerCategoryId,
  TournamentId,
} from '../domain';
import {
  SpeakerCategoryRepositoryPort,
  TournamentRepositoryPort,
} from '../domain/repository';
import { safeTry, ok, ResultAsync, Result } from 'neverthrow';
import { TabbycatError } from '../client/error';
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
  ): ResultAsync<
    SpeakerCategoryId,
    NotFoundError | TabbycatError | SaveFailedError
  > {
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
          yield* await tcClient.speakerCategories.create(speakerCategory);
        // yield* await this.sync(speakerCategoryDTO, tournamentId);
        return ok(speakerCategoryDTO.id);
      }.bind(this),
    );
  }

  private sync(
    speakerCategoryDTO: SpeakerCategoryDTO,
    tournamentId: TournamentId,
  ): Promise<Result<void, SaveFailedError>> {
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
