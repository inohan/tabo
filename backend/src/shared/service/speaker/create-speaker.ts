import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort, SpeakerDTO } from '../../clients/tabbycat';
import {
  NotFoundError,
  PartialFailedError,
  Speaker,
  TournamentId,
} from '../../domain';
import {
  SpeakerRepositoryPort,
  TournamentRepositoryPort,
} from '../../domain/repository';
import { safeTry, ok, err } from 'neverthrow';
import { throw_ } from 'src/lib/throw';

export class CreateSpeakerService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly speakerRepository: SpeakerRepositoryPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    tournamentId: TournamentId,
    speaker: PickUnbranded<
      Speaker,
      'name' | 'teamId' | 'categories' | 'institutionId'
    >,
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateSpeakerService) {
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
        // Speaker institution is not tracked by Tabbycat; it is derived from
        // the speaker's team, so it is not sent to the API.
        const speakerDTO = yield* await tcClient.createSpeaker(speaker);
        if (option?.sync ?? true) {
          const syncResult = await this.sync(tournamentId, speakerDTO);
          if (option?.failOnSyncFail ?? false) {
            yield* syncResult;
          }
        }
        return ok(speakerDTO.id);
      }.bind(this),
    );
  }

  executeMany(
    tournamentId: TournamentId,
    speakers: PickUnbranded<
      Speaker,
      'name' | 'teamId' | 'categories' | 'institutionId'
    >[],
    option?: {
      sync?: boolean;
      failOnSyncFail?: boolean;
    },
  ) {
    return safeTry(
      async function* (this: CreateSpeakerService) {
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
        // Speaker institution is not tracked by Tabbycat; it is derived from
        // the speaker's team, so it is not sent to the API.
        const speakerDTOs = await Promise.all(
          speakers.map((speaker) => tcClient.createSpeaker(speaker)),
        );
        // Save only successful results
        if (option?.sync ?? true) {
          const syncResult = await this.syncMany(
            tournamentId,
            speakerDTOs
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

        const results = speakerDTOs.map((res) => res.map((dto) => dto.id));
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

  sync(tournamentId: TournamentId, speakerDTO: SpeakerDTO) {
    return this.speakerRepository.save(
      Speaker.fromDto(speakerDTO, tournamentId),
    );
  }

  private syncMany(tournamentId: TournamentId, speakerDTOs: SpeakerDTO[]) {
    return this.speakerRepository.saveMany(
      speakerDTOs.map((speakerDTO) =>
        Speaker.fromDto(speakerDTO, tournamentId),
      ),
    );
  }
}
