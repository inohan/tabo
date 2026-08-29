import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort, InstitutionDTO } from '../../clients/tabbycat';
import {
  Institution,
  NotFoundError,
  PartialFailedError,
  TournamentId,
} from '../../domain';
import {
  InstitutionRepositoryPort,
  TournamentRepositoryPort,
} from '../../domain/repository';
import { safeTry, ok, err } from 'neverthrow';
import { throw_ } from 'src/lib/throw';

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
      /**
       * Whether to sync database on creation. Defaults to `true`
       */
      sync?: boolean;
      /**
       * If `sync` is `true`, whether to fail (raise SaveFailed) when the sync fails. Defaults to `false`.
       */
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateInstitutionService) {
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
        const institutionDTO =
          yield* await tcClient.createInstitution(institution);
        if (option?.sync ?? true) {
          const syncResult = await this.sync(tournamentId, institutionDTO);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }

        return ok(institutionDTO.id);
      }.bind(this),
    );
  }

  executeMany(
    tournamentId: TournamentId,
    institutions: PickUnbranded<Institution, 'name' | 'code'>[],
    option?: {
      /**
       * Whether to sync database on creation. Defaults to `true`
       */
      sync?: boolean;
      /**
       * If `sync` is `true`, whether to fail (raise SaveFailed) when the sync fails. Defaults to `false`.
       */
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateInstitutionService) {
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
        const institutionDTOs = await Promise.all(
          institutions.map((institution) =>
            tcClient.createInstitution(institution),
          ),
        );
        // Save only successful results
        if (option?.sync ?? true) {
          const syncResult = await this.syncMany(
            tournamentId,
            institutionDTOs
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

        const results = institutionDTOs.map((res) => res.map((dto) => dto.id));
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

  private sync(tournamentId: TournamentId, institutionDTO: InstitutionDTO) {
    const institutionEntity = Institution.init({
      tournamentId,
      id: institutionDTO.id,
      code: institutionDTO.code,
      name: institutionDTO.name,
    });
    return this.institutionRepository.save(institutionEntity);
  }

  private syncMany(
    tournamentId: TournamentId,
    institutionDTOs: InstitutionDTO[],
  ) {
    const institutionEntities = institutionDTOs.map((institutionDTO) =>
      Institution.init({
        tournamentId,
        id: institutionDTO.id,
        code: institutionDTO.code,
        name: institutionDTO.name,
      }),
    );
    return this.institutionRepository.saveMany(institutionEntities);
  }
}
