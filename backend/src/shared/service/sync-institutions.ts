import { ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort, TabbycatError } from '../clients/tabbycat';
import {
  Institution,
  InstitutionId,
  NotFoundError,
  SaveFailedError,
  TournamentId,
} from '../domain';
import { TournamentRepositoryPort, UnitOfWorkPort } from '../domain/repository';

export class SyncInstitutionsService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly unitOfWork: UnitOfWorkPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
  ): ResultAsync<void, NotFoundError | TabbycatError | SaveFailedError> {
    return safeTry(
      async function* (this: SyncInstitutionsService) {
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
        const syncedInstitutionDtos = yield* await tcClient.listInstitutions();
        const syncedInstitutionIdSet = new Set(
          syncedInstitutionDtos.map((inst) => inst.id),
        );
        yield* await this.unitOfWork.run(({ institutionRepository }) =>
          safeTry(async function* () {
            const oldInstitutions =
              yield* await institutionRepository.getByTournament(tournamentId);
            const oldInstitutionsMap = new Map<InstitutionId, Institution>(
              oldInstitutions.map((inst) => [inst.id, inst]),
            );
            // Delete nonexistent institutions from cache table
            yield* await institutionRepository.deleteMany(
              oldInstitutions.filter(
                (inst) => !syncedInstitutionIdSet.has(inst.id),
              ),
            );
            // Update/create new institutions
            return await institutionRepository.saveMany(
              syncedInstitutionDtos.map((dto) =>
                Institution.fromDto(
                  dto,
                  tournamentId,
                  oldInstitutionsMap.get(dto.id),
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
