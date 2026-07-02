import { err, ok, ResultAsync, safeTry } from 'neverthrow';
import { ClientFactoryPort } from '../client/client-port';
import { matchOrUndefined } from '../client/url-parse';
import {
  NotFoundError,
  SaveFailedError,
  Tournament,
  TournamentId,
} from '../domain';
import { TournamentRepositoryPort } from '../domain/repository';
import { TabbycatError } from '../client/error';

/**
 * Prohibited tournament slugs, from https://github.com/TabbycatDebate/tabbycat/blob/develop/tabbycat/tournaments/models.py
 */
const PROHIBITED_TOURNAMENT_SLUGS = [
  'jet',
  'database',
  'admin',
  'accounts',
  'summernote', // System
  'start',
  'create',
  'load-demo', // Setup Wizards
  'tournament',
  'notifications',
  'archive',
  'api', // Cross-Tournament app's view roots
  'favicon.ico',
  'robots.txt',
  'navigatorPush.service.js', // Files that must be at top level
  '__debug__',
  'static',
  'style',
  'i18n',
  'jsi18n', // Misc
];

export class CreateTournamentService {
  constructor(
    private readonly tournamentRepository: TournamentRepositoryPort,
    private readonly tabbycatClientFactory: ClientFactoryPort,
  ) {}

  execute(
    url: string,
    token: string,
    tournamentSlug?: string,
  ): ResultAsync<
    { tournamentId: TournamentId; slug: string; name: string },
    NotFoundError | SaveFailedError | TabbycatError
  > {
    return safeTry<
      { tournamentId: TournamentId; slug: string; name: string },
      NotFoundError | SaveFailedError | TabbycatError
    >(
      async function* (this: CreateTournamentService) {
        const baseUrl = new URL(url).origin;
        // Try to locate from URL
        if (tournamentSlug === undefined) {
          const res = matchOrUndefined(url, '/:tournamentSlug{/*rest}');
          if (
            res !== undefined &&
            !PROHIBITED_TOURNAMENT_SLUGS.includes(res.tournamentSlug)
          ) {
            tournamentSlug = res.tournamentSlug;
          }
        }
        // Try to locate from URL
        if (tournamentSlug === undefined) {
          const res = matchOrUndefined(
            url,
            '/api/v1/tournaments/:tournamentSlug{/*rest}',
          );
          if (
            res !== undefined &&
            !PROHIBITED_TOURNAMENT_SLUGS.includes(res.tournamentSlug)
          ) {
            tournamentSlug = res.tournamentSlug;
          }
        }
        if (tournamentSlug === undefined) {
          return yield* err(
            new NotFoundError('Tournament slug is not specified.'),
          );
        }
        const tcClient = this.tabbycatClientFactory({
          token,
          baseUrl,
          tournamentSlug,
        });
        const { name, id, shortName } = yield* await tcClient.tournaments.get();
        const tournament = Tournament.create({
          baseUrl,
          name,
          id,
          shortName,
          slug: tournamentSlug,
          token,
        });
        yield* await this.tournamentRepository.save(tournament);
        return ok({
          tournamentId: tournament.tournamentId,
          slug: tournamentSlug,
          name,
        });
      }.bind(this),
    );
  }
}
