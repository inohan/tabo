import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort, TeamDTO } from '../../clients/tabbycat';
import {
  InstitutionId,
  NotFoundError,
  PartialFailedError,
  SaveFailedError,
  Speaker,
  Team,
  TournamentId,
} from '../../domain';
import {
  TournamentRepositoryPort,
  UnitOfWorkPort,
} from '../../domain/repository';
import { safeTry, ok, err } from 'neverthrow';
import { throw_ } from 'src/lib/throw';

export class CreateTeamService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly unitOfWork: UnitOfWorkPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
    team: PickUnbranded<
      Team,
      'reference' | 'breakCategories' | 'institutionId'
    > & {
      speakers: PickUnbranded<Speaker, 'name' | 'categories', 'teamId'>[];
    },
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateTeamService) {
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
        const teamDTO = yield* await tcClient.createTeam(team);
        if (option?.sync ?? true) {
          const syncResult = await this.sync(tournamentId, teamDTO);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }
        return ok({
          id: teamDTO.id,
          speakerIds: teamDTO.speakers.map((spk) => spk.id),
        });
      }.bind(this),
    );
  }

  executeMany(
    tournamentId: TournamentId,
    teams: (PickUnbranded<
      Team,
      'reference' | 'breakCategories' | 'institutionId'
    > & {
      speakers: PickUnbranded<Speaker, 'name' | 'categories', 'teamId'>[];
    })[],
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateTeamService) {
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
        const teamDTOs = await Promise.all(
          teams.map((team) => tcClient.createTeam(team)),
        );
        // Save only successful results
        if (option?.sync ?? true) {
          const syncResult = await this.syncMany(
            tournamentId,
            teamDTOs
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

        const results = teamDTOs.map((res) =>
          res.map((dto) => ({
            id: dto.id,
            speakerIds: dto.speakers.map((spk) => spk.id),
          })),
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
    teamDTO: Omit<TeamDTO, 'speakers'> & {
      speakers: (TeamDTO['speakers'][number] & {
        institutionId?: InstitutionId | null;
      })[];
    },
  ) {
    return this.syncMany(tournamentId, [teamDTO]);
  }

  private async syncMany(
    tournamentId: TournamentId,
    teamDTOs: (Omit<TeamDTO, 'speakers'> & {
      speakers: (TeamDTO['speakers'][number] & {
        institutionId?: InstitutionId | null;
      })[];
    })[],
  ) {
    const teamEntities = teamDTOs.map((teamDTO) =>
      Team.fromDto(teamDTO, tournamentId),
    );
    // Tabbycat creates speakers nested under the team in the same request.
    // Their institution is inherited from the team.
    const speakerEntities = teamDTOs.flatMap((teamDTO) =>
      teamDTO.speakers.map((spkDTO) =>
        Speaker.replaceInstitution(
          // Always a new Speaker entity, so entity is not passed
          Speaker.fromDto(
            {
              ...spkDTO,
              teamId: teamDTO.id,
            },
            tournamentId,
          ),
          spkDTO.institutionId !== undefined
            ? spkDTO.institutionId
            : teamDTO.institutionId, // If speaker.institution is provided, prioritize it; otherwise use team institution
        ),
      ),
    );
    return await this.unitOfWork.run(({ teamRepository, speakerRepository }) =>
      safeTry<void, SaveFailedError>(async function* () {
        yield* await teamRepository.saveMany(teamEntities);
        return await speakerRepository.saveMany(speakerEntities);
      }),
    );
  }
}
