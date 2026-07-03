import { ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort } from '../client/client-port';
import {
  NotFoundError,
  SaveFailedError,
  Speaker,
  SpeakerId,
  Team,
  TeamId,
  TournamentId,
} from '../domain';
import {
  TournamentRepositoryPort,
  TransactionError,
  UnitOfWorkPort,
} from '../domain/repository';
import { TabbycatError } from '../client/error';
import { omit } from 'src/lib/omit';
import { dot } from 'node:test/reporters';

export class SyncTeamsService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly unitOfWork: UnitOfWorkPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
  ): ResultAsync<
    void,
    NotFoundError | TabbycatError | SaveFailedError | TransactionError
  > {
    return safeTry<
      void,
      NotFoundError | TabbycatError | SaveFailedError | TransactionError
    >(
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
        const syncedTeamDtos = yield* await tcClient.teams.list();
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
              for (const team of oldTeams.filter(
                (team) => !syncedTeamIdSet.has(team.id),
              )) {
                yield* await teamRepository.delete(team);
              }
              // Update/create new teams
              for (const dto of syncedTeamDtos) {
                const foundTeam = oldTeamsMap.get(dto.id);
                if (foundTeam !== undefined) {
                  const newTeam = Team.init({
                    tournamentId: foundTeam.tournamentId,
                    ...omit(dto, ['speakers'] as const),
                    speakers: dto.speakers.map((spk) => spk.id),
                  });
                  yield* await teamRepository.save(newTeam);
                } else {
                  yield* await teamRepository.save(
                    Team.init({
                      tournamentId: tournamentId,
                      ...omit(dto, ['speakers'] as const),
                      speakers: dto.speakers.map((spk) => spk.id),
                    }),
                  );
                }
              }
              // Sync speakers
              const oldSpeakers =
                yield* await speakerRepository.getByTournament(tournamentId);
              const oldSpeakersMap = new Map<SpeakerId, Speaker>(
                oldSpeakers.map((spk) => [spk.id, spk]),
              );
              // Delete nonexistent teams from cache table
              for (const speaker of oldSpeakers.filter(
                (speaker) => !syncedSpeakerIdSet.has(speaker.id),
              )) {
                yield* await speakerRepository.delete(speaker);
              }
              // Update/create new teams
              for (const dto of syncedSpeakerDtos) {
                const foundSpeaker = oldSpeakersMap.get(dto.id);
                if (foundSpeaker !== undefined) {
                  const newSpeaker = Speaker.init({
                    tournamentId: foundSpeaker.tournamentId,
                    id: foundSpeaker.id,
                    institutionId: foundSpeaker.institutionId,
                    ...omit(dto, ['id', 'institutionId'] as const),
                  });
                  yield* await speakerRepository.save(newSpeaker);
                } else {
                  yield* await speakerRepository.save(
                    Speaker.init({
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
