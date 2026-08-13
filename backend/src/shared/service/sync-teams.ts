import { ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort, TabbycatError } from '../clients/tabbycat';
import {
  NotFoundError,
  SaveFailedError,
  Speaker,
  SpeakerId,
  Team,
  TeamId,
  TournamentId,
} from '../domain';
import { TournamentRepositoryPort, UnitOfWorkPort } from '../domain/repository';

export class SyncTeamsService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly unitOfWork: UnitOfWorkPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
  ): ResultAsync<void, NotFoundError | TabbycatError | SaveFailedError> {
    return safeTry(
      async function* (this: SyncTeamsService) {
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
        const syncedTeamDtos = yield* await tcClient.listTeams();
        const syncedTeamIdSet = new Set(syncedTeamDtos.map((team) => team.id));
        // InstitutionId should only be set when entity is created; otherwise it should inherit
        const syncedSpeakerDtos = syncedTeamDtos
          .map((teamDto) =>
            teamDto.speakers.map((speakerDto) => ({
              ...speakerDto,
              teamId: teamDto.id,
              institutionId: teamDto.institutionId,
            })),
          )
          .flat();
        const syncedSpeakerIdSet = new Set(
          syncedSpeakerDtos.map((spk) => spk.id),
        );
        yield* await this.unitOfWork.run(
          ({ teamRepository, speakerRepository }) =>
            safeTry<void, NotFoundError | SaveFailedError>(async function* () {
              // Sync teams
              const oldTeams =
                yield* await teamRepository.getByTournament(tournamentId);
              const oldTeamsMap = new Map<TeamId, Team>(
                oldTeams.map((team) => [team.id, team]),
              );
              // Delete nonexistent teams from cache table
              yield* await teamRepository.deleteMany(
                oldTeams.filter((team) => !syncedTeamIdSet.has(team.id)),
              );
              // Update/create new teams
              yield* await teamRepository.saveMany(
                syncedTeamDtos.map((dto) =>
                  Team.fromDto(dto, tournamentId, oldTeamsMap.get(dto.id)),
                ),
              );
              // Sync speakers
              const oldSpeakers =
                yield* await speakerRepository.getByTournament(tournamentId);
              const oldSpeakersMap = new Map<SpeakerId, Speaker>(
                oldSpeakers.map((spk) => [spk.id, spk]),
              );
              // Delete nonexistent speakers from cache table
              yield* await speakerRepository.deleteMany(
                oldSpeakers.filter(
                  (speaker) => !syncedSpeakerIdSet.has(speaker.id),
                ),
              );
              // Update/create new speakers
              return await speakerRepository.saveMany(
                syncedSpeakerDtos.map((dto) => {
                  let spk = Speaker.fromDto(
                    dto,
                    tournamentId,
                    oldSpeakersMap.get(dto.id),
                  );
                  if (dto.institutionId !== null) {
                    spk = Speaker.replaceInstitution(spk, dto.institutionId);
                  }
                  return spk;
                }),
              );
            }),
        );
        return ok();
      }.bind(this),
    );
  }
}
