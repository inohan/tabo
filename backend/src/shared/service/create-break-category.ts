import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort } from '../client/client-port';
import { BreakCategory, TournamentId } from '../domain';
import {
  BreakCategoryRepositoryPort,
  TournamentRepositoryPort,
} from '../domain/repository';
import { safeTry, ok } from 'neverthrow';
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
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
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
          yield* await tcClient.createBreakCategory(breakCategory);
        if (option?.sync ?? true) {
          const syncResult = await this.sync(breakCategoryDTO, tournamentId);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }
        return ok(breakCategoryDTO.id);
      }.bind(this),
    );
  }

  private sync(breakCategoryDTO: BreakCategoryDTO, tournamentId: TournamentId) {
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
