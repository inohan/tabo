import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TournamentAuth } from '../tournament/tournament.guard';
import { ok, safeTry } from 'neverthrow';
import {
  CreateInstitutionService,
  GetInstitutionService,
  ListInstitutionsService,
  SyncInstitutionsService,
} from '@shared/service';
import {
  InstitutionId,
  NotFoundError,
  SaveFailedError,
  TournamentId,
} from '@shared/domain';
import { match, P } from 'ts-pattern';
import {
  NestCreateInstitutionDto,
  NestInstitutionDto,
} from './dto/institution.dto';
import { TabbycatError } from '@shared/clients/tabbycat/error';
import { ApiValibotResponse } from '../lib/valibot';
import { throwHttpError } from '../lib/throw-http-error';

@TournamentAuth()
@Controller('tournaments/:tournamentId/institutions')
export class InstitutionController {
  constructor(
    private getInstitutionService: GetInstitutionService,
    private listInstitutionService: ListInstitutionsService,
    private syncInstitutionsService: SyncInstitutionsService,
    private createInstitutionService: CreateInstitutionService,
  ) {}

  @ApiValibotResponse(NestInstitutionDto, { isArray: true })
  @Get()
  async listInstitutions(
    @Param('tournamentId') tournamentId: string,
  ): Promise<NestInstitutionDto[]> {
    const result = await this.listInstitutionService.execute(
      TournamentId.init(tournamentId),
    );

    return result.match(
      (t) => t,
      (e) => match(e).exhaustive(),
    );
  }

  @ApiValibotResponse(NestInstitutionDto, { status: 201, isArray: true })
  @Post('sync')
  async syncInstitutions(
    @Param('tournamentId') tournamentIdRaw: string,
  ): Promise<NestInstitutionDto[]> {
    return safeTry(
      async function* (this: InstitutionController) {
        const tournamentId = TournamentId.init(tournamentIdRaw);
        yield* await this.syncInstitutionsService.execute(tournamentId);
        const result =
          yield* await this.listInstitutionService.execute(tournamentId);
        return ok(result);
      }.bind(this),
    ).match(
      (t) => t,
      (e) =>
        match(e)
          .with(
            P.instanceOf(NotFoundError),
            throwHttpError(BadRequestException),
          )
          .with(
            P.instanceOf(TabbycatError),
            throwHttpError(BadRequestException),
          )
          .with(
            P.instanceOf(SaveFailedError),
            throwHttpError(BadRequestException),
          )
          .exhaustive(),
    );
  }

  @ApiValibotResponse(NestInstitutionDto, { status: 201 })
  @Post()
  async createInstitution(
    @Body() { name, code }: NestCreateInstitutionDto,
    @Param('tournamentId') tournamentIdRaw: string,
  ): Promise<NestInstitutionDto> {
    return safeTry(
      async function* (this: InstitutionController) {
        const tournamentId = TournamentId.init(tournamentIdRaw);
        const created = yield* await this.createInstitutionService.execute(
          tournamentId,
          { name, code },
        );
        return ok(
          yield* await this.getInstitutionService.execute(
            tournamentId,
            created,
          ),
        );
      }.bind(this),
    ).match(
      (t) => t,
      (e) =>
        match(e)
          .with(P.instanceOf(NotFoundError), throwHttpError(NotFoundException))
          .with(
            P.instanceOf(TabbycatError),
            throwHttpError(BadRequestException),
          )
          .with(
            P.instanceOf(SaveFailedError),
            throwHttpError(BadRequestException),
          )
          .exhaustive(),
    );
  }

  @ApiValibotResponse(NestInstitutionDto)
  @Get(':institutionId')
  async getInstitution(
    @Param('tournamentId') tournamentIdRaw: string,
    // Route params arrive as strings; the `number` annotation alone never
    // converted them, so this was reaching the query layer as a string.
    @Param('institutionId', ParseIntPipe) institutionIdRaw: number,
  ): Promise<NestInstitutionDto> {
    const result = await this.getInstitutionService.execute(
      TournamentId.init(tournamentIdRaw),
      InstitutionId.init(institutionIdRaw),
    );
    return result.match(
      (t) => t,
      (e) =>
        match(e)
          .with(P.instanceOf(NotFoundError), throwHttpError(NotFoundException))
          .exhaustive(),
    );
  }

  //TODO: implement PUT endpoint
}
