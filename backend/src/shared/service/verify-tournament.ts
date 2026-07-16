import { ClientFactoryPort, ClientPort } from '@shared/client/client-port';
import { TabbycatError, TabbycatResponseError } from '@shared/client/error';
import { matchOrUndefined } from '@shared/client/url-parse';
import { NotFoundError } from '@shared/domain';
import { err, ok, Result, ResultAsync, safeTry } from 'neverthrow';
import { match, P } from 'ts-pattern';

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

export class VerifyTournamentService {
  constructor(private tabbycatClientFactory: ClientFactoryPort) {}

  execute({
    url,
    token,
    tournamentSlug,
  }: {
    url: string;
    token: string;
    tournamentSlug?: string;
  }): ResultAsync<
    {
      baseUrl: string;
      tournaments: {
        id: number;
        slug: string;
        name: string;
        shortName: string;
      }[];
    },
    TabbycatError | NotFoundError
  > {
    return safeTry<
      {
        baseUrl: string;
        tournaments: {
          id: number;
          slug: string;
          name: string;
          shortName: string;
        }[];
      },
      TabbycatError | NotFoundError
    >(
      async function* (this: VerifyTournamentService) {
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

        // Tournament slug is located from input or URL
        if (tournamentSlug !== undefined) {
          const tabbycatClient = this.tabbycatClientFactory({
            baseUrl,
            token,
            tournamentSlug,
          });
          // Token verification
          yield* await this.verifyToken(tabbycatClient);
          const tournament = yield* await tabbycatClient.getTournament();
          return ok({
            baseUrl,
            tournaments: [tournament],
          });
          // Tournament slug is not located from input or URL
        } else {
          const tabbycatClient = this.tabbycatClientFactory({
            baseUrl,
            token,
            tournamentSlug: '', // Use '' for placeholder
          });
          // Token verification
          yield* await this.verifyToken(tabbycatClient);
          const tournaments = yield* await tabbycatClient.listTournaments();
          if (tournaments.length === 0) {
            return yield* err(new NotFoundError());
          }
          return ok({
            baseUrl,
            tournaments: tournaments,
          });
        }
      }.bind(this),
    );
  }

  private async verifyToken(
    client: ClientPort,
  ): Promise<Result<void, TabbycatError>> {
    const meResult = await client.me();
    // Patch for calicotab not returning correct user for /users/me endpoint (https://github.com/TabbycatDebate/tabbycat/issues/2892)
    return meResult.match(
      (t) => ok(t),
      (e) =>
        match(e)
          .with(P.instanceOf(TabbycatResponseError), (respError) =>
            match(respError.response.status)
              .with(404, () => ok())
              .otherwise(() => err(respError)),
          )
          .otherwise((tabbycatError) => err(tabbycatError)),
    );
  }
}
