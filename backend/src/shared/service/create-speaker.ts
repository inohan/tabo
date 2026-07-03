import { PickUnbranded } from 'src/lib/brand';
import { ClientFactoryPort } from '../client/client-port';
import {
  NotFoundError,
  SaveFailedError,
  Speaker,
  SpeakerId,
  TournamentId,
} from '../domain';
import {
  SpeakerRepositoryPort,
  TournamentRepositoryPort,
} from '../domain/repository';
import { safeTry, ok, ResultAsync, Result } from 'neverthrow';
import { TabbycatError } from '../client/error';
import { SpeakerDTO } from '../client/output-dto';

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
  ): ResultAsync<SpeakerId, NotFoundError | TabbycatError | SaveFailedError> {
    return safeTry(
      async function* (this: CreateSpeakerService) {
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
        // Speaker institution is not tracked by Tabbycat; it is derived from
        // the speaker's team, so it is not sent to the API.
        const speakerDTO = yield* await tcClient.speakers.create(speaker);
        // yield* await this.sync(speakerDTO, tournamentId);
        return ok(speakerDTO.id);
      }.bind(this),
    );
  }

  sync(
    speakerDTO: SpeakerDTO,
    tournamentId: TournamentId,
  ): Promise<Result<void, SaveFailedError>> {
    const speakerEntity = Speaker.init({
      tournamentId,
      id: speakerDTO.id,
      name: speakerDTO.name,
      teamId: speakerDTO.teamId,
      categories: speakerDTO.categories,
      anonymous: speakerDTO.anonymous,
      email: speakerDTO.email,
      institutionId: null,
    });
    return this.speakerRepository.save(speakerEntity);
  }
}
