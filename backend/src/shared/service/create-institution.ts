import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort } from '../client/client-port';
import { Institution, TournamentId } from '../domain';
import {
  InstitutionRepositoryPort,
  TournamentRepositoryPort,
} from '../domain/repository';
import { safeTry, ok } from 'neverthrow';
import { InstitutionDTO } from '../client/output-dto';

export class CreateInstitutionService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly institutionRepository: InstitutionRepositoryPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
    institution: PickUnbranded<Institution, 'name' | 'code'>,
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateInstitutionService) {
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
        const institutionDTO =
          yield* await tcClient.createInstitution(institution);
        if (option?.sync ?? true) {
          const syncResult = await this.sync(institutionDTO, tournamentId);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }

        return ok(institutionDTO.id);
      }.bind(this),
    );
  }

  private sync(institutionDTO: InstitutionDTO, tournamentId: TournamentId) {
    const institutionEntity = Institution.init({
      tournamentId,
      id: institutionDTO.id,
      code: institutionDTO.code,
      name: institutionDTO.name,
    });
    return this.institutionRepository.save(institutionEntity);
  }
}
