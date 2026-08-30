import { GetProviderAccessTokenService } from '@identity/service/get-access-token';
import { ImportCredentials } from '@importer/domain/values';
import {
  CreateTeamImportSessionService,
  ExecuteTeamImportService,
  SetTeamDoImportStatusService,
} from '@importer/service';
import { GetTeamImportSessionService } from '@importer/service/get-team-import';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthError,
  FileError,
  NotFoundError,
  ParseFailedError,
  SaveFailedError,
  TournamentId,
} from '@shared/domain';
import { Session } from '@thallesp/nestjs-better-auth';
import { err, ok, safeTry } from 'neverthrow';
import { throwHttpError } from 'src/api/lib/throw-http-error';
import { type ActiveUserSession } from 'src/api/lib/user-session';
import { NestImportOrigin } from 'src/api/shared/dto/import-origin.dto';
import { TournamentAuth } from 'src/api/tournament/tournament.guard';
import { throw_ } from 'src/lib/throw';
import { match, P } from 'ts-pattern';
import {
  NestTeamImportMissingEntitiesDto,
  NestTeamImportSessionDto,
} from './dto/team.dto';
import { TeamImportSessionId } from '@importer/domain/models';
import {
  InvalidImportSessionStateError,
  TeamImportFailedError,
} from '@importer/domain/error';
import { ApiValibotResponse } from 'src/api/lib/valibot';
import { NestDoImportUpdateDto } from '../dto/do-update.dto';

@TournamentAuth()
@Controller('tournaments/:tournamentId/import/teams')
export class TeamImportController {
  constructor(
    private createTeamImportSessionService: CreateTeamImportSessionService,
    private executeTeamImportService: ExecuteTeamImportService,
    private getTeamImportSessionService: GetTeamImportSessionService,
    private getProviderAccessTokenService: GetProviderAccessTokenService,
    private setTeamDoImportStatusService: SetTeamDoImportStatusService,
  ) {}

  @ApiValibotResponse(NestTeamImportSessionDto)
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
            .with(P.instanceOf(FileError), throwHttpError(BadRequestException))
            .with(
              P.instanceOf(ParseFailedError),
              throwHttpError(BadRequestException),
            )
            .exhaustive(),
        ),
    );
  }

  @Post(':teamImportSessionId/do-import')
  async setDoImportStatus(
    @Body() updates: NestDoImportUpdateDto[],
    @Param('tournamentId') tournamentId: TournamentId,
    @Param('teamImportSessionId') teamImportSessionId: TeamImportSessionId,
  ): Promise<void> {
    return safeTry(
      async function* (this: TeamImportController) {
        yield* await this.setTeamDoImportStatusService.execute({
          tournamentId,
          importSessionId: teamImportSessionId,
          updates,
        });
        return ok();
      }.bind(this),
    ).match(
      (t) => t,
      (e) =>
        match(e)
          .with(P.instanceOf(NotFoundError), throwHttpError(NotFoundException))
          .with(
            P.instanceOf(InvalidImportSessionStateError),
            throwHttpError(BadRequestException),
          )
          .with(
            P.instanceOf(SaveFailedError),
            throwHttpError(InternalServerErrorException),
          )
          .exhaustive(),
    );
  }

  @ApiValibotResponse(NestTeamImportMissingEntitiesDto)
  @Get(':teamImportSessionId/missing-entities')
  async getMissingEntities(
    @Param('tournamentId') tournamentId: TournamentId,
    @Param('teamImportSessionId') teamImportSessionId: TeamImportSessionId,
  ): Promise<NestTeamImportMissingEntitiesDto> {
    return safeTry(
      async function* (this: TeamImportController) {
        const missingEntities =
          yield* await this.executeTeamImportService.getMissingEntities({
            tournamentId,
            importSessionId: teamImportSessionId,
          });
        return ok(missingEntities);
      }.bind(this),
    ).match(
      (t) => t,
      (e) =>
        match(e)
          .with(P.instanceOf(NotFoundError), throwHttpError(NotFoundException))
          .exhaustive(),
    );
  }

  @ApiValibotResponse(NestTeamImportSessionDto)
  @Post(':teamImportSessionId/execute')
  async executeImport(
    @Param('tournamentId') tournamentId: TournamentId,
    @Param('teamImportSessionId') teamImportSessionId: TeamImportSessionId,
  ): Promise<NestTeamImportSessionDto> {
    return safeTry(
      async function* (this: TeamImportController) {
        const importResult = await this.executeTeamImportService.execute({
          tournamentId,
          importSessionId: teamImportSessionId,
        });
        yield* importResult.orElse((e) =>
          match(e)
            .with(P.instanceOf(TeamImportFailedError), () => ok())
            .otherwise((e) => err(e)),
        );
        return await this.getTeamImportSessionService.execute(
          tournamentId,
          teamImportSessionId,
        );
      }.bind(this),
    ).match(
      (t) => t,
      (e) =>
        match(e)
          .with(P.instanceOf(NotFoundError), throwHttpError(NotFoundException))
          .with(
            P.instanceOf(InvalidImportSessionStateError),
            throwHttpError(ConflictException),
          )
          .with(
            P.instanceOf(SaveFailedError),
            throwHttpError(InternalServerErrorException),
          )
          .exhaustive(),
    );
  }
}
