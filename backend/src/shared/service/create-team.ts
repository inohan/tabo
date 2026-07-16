import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort } from '../client/client-port';
import {
  NotFoundError,
  SaveFailedError,
  Speaker,
  Team,
  TeamId,
  TournamentId,
} from '../domain';
import { TournamentRepositoryPort, UnitOfWorkPort } from '../domain/repository';
import { safeTry, ok, ResultAsync, Result } from 'neverthrow';
import { TabbycatError } from '../client/error';
import { TeamDTO } from '../client/output-dto';

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
      speakers: PickUnbranded<
        Speaker,
        'name' | 'categories',
        'institutionId' | 'teamId'
      >[];
    },
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateTeamService) {
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
        const teamDTO = yield* await tcClient.createTeam(team);
        if (option?.sync ?? true) {
          const syncResult = await this.sync(teamDTO, tournamentId);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }
        // yield* await this.sync(teamDTO, tournamentId);
        return ok(teamDTO.id);
      }.bind(this),
    );
  }

  private async sync(teamDTO: TeamDTO, tournamentId: TournamentId) {
    const teamEntity = Team.init({
      tournamentId,
      id: teamDTO.id,
      reference: teamDTO.reference,
      shortReference: teamDTO.shortReference,
      institutionId: teamDTO.institutionId,
      institutionConflicts: teamDTO.institutionConflicts,
      speakers: teamDTO.speakers.map((spk) => spk.id),
      breakCategories: teamDTO.breakCategories,
      emoji: teamDTO.emoji,
      codeName: teamDTO.codeName,
      useInstitutionPrefix: teamDTO.useInstitutionPrefix,
      shortName: teamDTO.shortName,
      longName: teamDTO.longName,
    });
    const speakerEntities = teamDTO.speakers.map((spkDTO) =>
      Speaker.init({
        tournamentId,
        id: spkDTO.id,
        name: spkDTO.name,
        teamId: teamEntity.id,
        categories: spkDTO.categories,
        anonymous: spkDTO.anonymous,
        email: spkDTO.email,
        institutionId: teamEntity.institutionId,
      }),
    );
    return await this.unitOfWork.run(({ teamRepository, speakerRepository }) =>
      safeTry<void, SaveFailedError>(async function* () {
        yield* await teamRepository.save(teamEntity);
        // Tabbycat creates speakers nested under the team in the same
        // request, returning their ids in the same order they were sent.
        for (const spkEntity of speakerEntities) {
          yield* await speakerRepository.save(spkEntity);
        }
        return ok();
      }),
    );
  }
}
