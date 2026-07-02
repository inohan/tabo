import { PickUnbranded, Unbranded } from 'src/lib/brand';
import { ClientFactoryPort } from '../client/client-port';
import {
  Institution,
  NotFoundError,
  SaveFailedError,
  TournamentId,
} from '../domain';
import {
  InstitutionRepositoryPort,
  TournamentRepositoryPort,
} from '../domain/repository';
import { safeTry, ok, ResultAsync } from 'neverthrow';
import { TabbycatError } from '../client/error';

export class CreateInstitutionService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly institutionRepository: InstitutionRepositoryPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
    institution: PickUnbranded<Institution, 'name' | 'code'>,
  ): ResultAsync<
    Unbranded<Institution>,
    NotFoundError | TabbycatError | SaveFailedError
  > {
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
          yield* await tcClient.institutions.create(institution);
        const institutionEntity = Institution.init({
          tournamentId,
          id: institutionDTO.id,
          code: institutionDTO.code,
          name: institutionDTO.name,
        });
        yield* await this.institutionRepository.save(institutionEntity);
        return ok(Institution.plain(institutionEntity));
      }.bind(this),
    );
  }
}
