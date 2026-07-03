import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort } from '../client/client-port';
import {
  BreakCategory,
  BreakCategoryId,
  NotFoundError,
  SaveFailedError,
  TournamentId,
} from '../domain';
import {
  BreakCategoryRepositoryPort,
  TournamentRepositoryPort,
} from '../domain/repository';
import { safeTry, ok, ResultAsync, Result } from 'neverthrow';
import { TabbycatError } from '../client/error';
import { BreakCategoryDTO } from '../client/output-dto';

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
  ): ResultAsync<
    BreakCategoryId,
    NotFoundError | TabbycatError | SaveFailedError
  > {
    return safeTry(
      async function* (this: CreateBreakCategoryService) {
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
        const breakCategoryDTO =
          yield* await tcClient.breakCategories.create(breakCategory);
        // yield* await this.sync(breakCategoryDTO, tournamentId);
        return ok(breakCategoryDTO.id);
      }.bind(this),
    );
  }

  private sync(
    breakCategoryDTO: BreakCategoryDTO,
    tournamentId: TournamentId,
  ): Promise<Result<void, SaveFailedError>> {
    const breakCategoryEntity = BreakCategory.init({
      tournamentId,
      id: breakCategoryDTO.id,
      name: breakCategoryDTO.name,
      slug: breakCategoryDTO.slug,
      seq: breakCategoryDTO.seq,
      breakSize: breakCategoryDTO.breakSize,
      reserveSize: breakCategoryDTO.reserveSize,
      isGeneral: breakCategoryDTO.isGeneral,
      priority: breakCategoryDTO.priority,
    });
    return this.breakCategoryRepository.save(breakCategoryEntity);
  }
}
