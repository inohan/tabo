import { ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort } from '../client/client-port';
import {
  Institution,
  InstitutionId,
  NotFoundError,
  SaveFailedError,
  TournamentId,
} from '../domain';
import { TournamentRepositoryPort, UnitOfWorkPort } from '../domain/repository';
import { TabbycatError } from '../client/error';

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
          safeTry<void, NotFoundError | SaveFailedError>(async function* () {
            const oldInstitutions =
              yield* await institutionRepository.getByTournament(tournamentId);
            const oldInstitutionsMap = new Map<InstitutionId, Institution>(
              oldInstitutions.map((inst) => [inst.id, inst]),
            );
            // Delete nonexistent institutions from cache table
            for (const inst of oldInstitutions.filter(
              (inst) => !syncedInstitutionIdSet.has(inst.id),
            )) {
              yield* await institutionRepository.delete(inst);
            }
            // Update/create new institutions
            for (const dto of syncedInstitutionDtos) {
              const foundInst = oldInstitutionsMap.get(dto.id);
              if (foundInst !== undefined) {
                const updatedInst = Institution.init({
                  tournamentId: foundInst.tournamentId,
                  ...dto,
                });
                yield* await institutionRepository.save(updatedInst);
              } else {
                yield* await institutionRepository.save(
                  Institution.init({
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
