import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import {
  ListOrganizationTournamentService,
  AddOrganizationTournamentService,
} from '@identity/service';
import {
  CreateTournamentService,
  GetTournamentService,
  ListTournamentsService,
  VerifyTournamentService,
} from '@shared/service';
import { NotFoundError, SaveFailedError, TournamentId } from '@shared/domain';
import { TournamentAuth } from './tournament.guard';
import {
  NestCreateTournamentDto,
  NestQueryTournamentCandidateDto,
  NestQueryTournamentCandidateResponseDto,
  NestTournamentDto,
} from './dto/tournament.dto';
import { HasActiveOrganization } from '../organization/active-organization.guard';
import { TabbycatError } from '@shared/client/error';
import { throw_ } from 'src/lib/throw';
import { ok, safeTry } from 'neverthrow';
import type { ActiveUserSession } from '../lib/user-session';
import { match, P } from 'ts-pattern';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('tournaments')
export class TournamentController {
  constructor(
    private readonly listOrganizationTournamentService: ListOrganizationTournamentService,
    private readonly addOrganizationTournamentService: AddOrganizationTournamentService,
    private readonly listTournamentService: ListTournamentsService,
    private readonly getTournamentService: GetTournamentService,
    private readonly createTournamentService: CreateTournamentService,
    private readonly verifyTournamentService: VerifyTournamentService,
  ) {}

  // @MemberHasPermission({} as Permission)
  @SerializeOptions({ type: NestTournamentDto })
  @HasActiveOrganization()
  @Get()
  async listTournaments(
    @Session() session: ActiveUserSession,
  ): Promise<NestTournamentDto[]> {
    return await safeTry(
      async function* (this: TournamentController) {
        const tournamentsInOrganization =
          yield* await this.listOrganizationTournamentService.execute({
            organizationId: session.session.activeOrganizationId,
          });
        return this.listTournamentService.execute(
          tournamentsInOrganization.map(TournamentId.init),
        );
      }.bind(this),
    ).match(
      (t) => t,
      (e) => throw_(new BadRequestException()),
    );
  }

  @HasActiveOrganization()
  @Post()
  createTournament(
    @Body() { baseUrl, tournamentSlug, token }: NestCreateTournamentDto,
    @Session() session: ActiveUserSession,
  ): Promise<NestTournamentDto> {
    return safeTry(
      async function* (this: TournamentController) {
        const { baseUrl: baseUrlVerified, tournaments } =
          yield* await this.verifyTournamentService.execute({
            url: baseUrl,
            tournamentSlug,
            token,
          });
        if (baseUrlVerified !== baseUrl || tournaments.length !== 1) {
          throw new BadRequestException('Verification failed.');
        }
        const tournament = yield* await this.createTournamentService.execute(
          baseUrl,
          token,
          tournamentSlug,
        );
        yield* await this.addOrganizationTournamentService.execute({
          organizationId: session.session.activeOrganizationId,
          tournamentId: tournament.tournamentId,
        });
        const queryResult = yield* await this.getTournamentService.execute(
          tournament.tournamentId,
        );
        return ok(queryResult);
      }.bind(this),
    ).match(
      (t) => t,
      (e) =>
        throw_(
          match(e)
            .with(
              P.instanceOf(NotFoundError),
              (e) => new NotFoundException(e.message, { cause: e }),
            )
            .with(
              P.instanceOf(SaveFailedError),
              (e) => new BadRequestException(e.message, { cause: e }),
            )
            .with(
              P.instanceOf(TabbycatError),
              (e) => new BadRequestException(e.message, { cause: e }),
            )
            .exhaustive(),
        ),
    );
  }

  @HasActiveOrganization()
  @Post('query-candidates')
  async searchFuzzyTournament(
    @Body() { url, token, tournamentSlug }: NestQueryTournamentCandidateDto,
  ): Promise<NestQueryTournamentCandidateResponseDto> {
    return safeTry(
      async function* (this: TournamentController) {
        return ok(
          yield* await this.verifyTournamentService.execute({
            url,
            token,
            tournamentSlug,
          }),
        );
      }.bind(this),
    ).match(
      (t) => t,
      (e) =>
        throw_(
          match(e)
            .with(
              P.instanceOf(NotFoundError),
              (e) => new NotFoundException(e.message, { cause: e }),
            )
            .with(
              P.instanceOf(TabbycatError),
              (e) => new BadRequestException(e.message, { cause: e }),
            )
            .exhaustive(),
        ),
    );
  }

  @SerializeOptions({ type: NestTournamentDto })
  @TournamentAuth()
  @Get(':tournamentId')
  async getTournament(
    @Param('tournamentId') tournamentId: string,
  ): Promise<NestTournamentDto> {
    const result = await this.getTournamentService.execute(
      TournamentId.init(tournamentId),
    );
    return result.match(
      (t) => t,
      (e) =>
        throw_(
          match(e)
            .with(
              P.instanceOf(NotFoundError),
              (e) => new NotFoundException(e.message, { cause: e }),
            )
            .exhaustive(),
        ),
    );
  }
}
