import { GetProviderAccessTokenService } from '@identity/service/get-access-token';
import { ImportCredentials } from '@importer/domain/values';
import {
  CreateTeamImportSessionService,
  ExecuteTeamImportService,
} from '@importer/service';
import { GetTeamImportSessionService } from '@importer/service/get-team-import';
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthError,
  NotFoundError,
  SaveFailedError,
  TournamentId,
} from '@shared/domain';
import { Session } from '@thallesp/nestjs-better-auth';
import { ok, safeTry } from 'neverthrow';
import { throwHttpError } from 'src/api/lib/throw-http-error';
import { type ActiveUserSession } from 'src/api/lib/user-session';
import { NestImportOrigin } from 'src/api/shared/dto/import-origin.dto';
import { TournamentAuth } from 'src/api/tournament/tournament.guard';
import { throw_ } from 'src/lib/throw';
import { match, P } from 'ts-pattern';
import { NestTeamImportSessionDto } from './dto/team.dto';

@TournamentAuth()
@Controller('tournaments/:tournamentId/import/teams')
export class TeamImportController {
  constructor(
    private createTeamImportSessionService: CreateTeamImportSessionService,
    private executeTeamImportService: ExecuteTeamImportService,
    private getTeamImportSessionService: GetTeamImportSessionService,
    private getProviderAccessTokenService: GetProviderAccessTokenService,
  ) {}

  @Post()
  async createImportSession(
    @Body() importOrigin: NestImportOrigin,
    @Param('tournamentId') tournamentIdRaw: string,
    @Session() session: ActiveUserSession,
  ): Promise<NestTeamImportSessionDto> {
    return safeTry(
      async function* (this: TeamImportController) {
        const tournamentId = TournamentId.init(tournamentIdRaw);
        const credentials: ImportCredentials = yield* await match(importOrigin)
          .with({ type: 'google-sheets' }, async () =>
            (
              await this.getProviderAccessTokenService.execute({
                userId: session.user.id,
                providerId: 'google',
                requiredScopes: ['https://www.googleapis.com/auth/drive.file'],
              })
            ).map((t) => ({
              type: 'google' as const,
              accessToken: t,
            })),
          )
          .otherwise(() => ok({ type: 'none' as const }));

        const sessionId =
          yield* await this.createTeamImportSessionService.execute({
            tournamentId,
            origin: importOrigin,
            credentials,
          });
        return this.getTeamImportSessionService.execute(
          tournamentId,
          sessionId,
        );
      }.bind(this),
    ).match(
      (t) => t,
      (e) =>
        throw_(
          match(e)
            .with(
              P.instanceOf(AuthError),
              throwHttpError(UnauthorizedException),
            )
            .with(
              P.instanceOf(NotFoundError),
              throwHttpError(NotFoundException),
            )
            .with(
              P.instanceOf(SaveFailedError),
              throwHttpError(BadRequestException),
            )
            .exhaustive(),
        ),
    );
  }
}
