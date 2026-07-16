import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { TournamentAuth } from '../tournament/tournament.guard';
import { ok, safeTry } from 'neverthrow';
import { throw_ } from 'src/lib/throw';
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
import { TabbycatError } from '@shared/client/error';

@TournamentAuth()
@Controller('tournaments/:tournamentId/institutions')
export class InstitutionController {
  constructor(
    private getInstitutionService: GetInstitutionService,
    private listInstitutionService: ListInstitutionsService,
    private syncInstitutionsService: SyncInstitutionsService,
    private createInstitutionService: CreateInstitutionService,
  ) {}

  @Get()
  async listInstitutions(
    @Param('tournamentId') tournamentId: string,
  ): Promise<NestInstitutionDto[]> {
    const result = await this.listInstitutionService.execute(
      TournamentId.init(tournamentId),
    );

    return result.match(
      (t) => t,
      (e) => throw_(match(e).exhaustive()),
    );
  }

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
            .with(
              P.instanceOf(SaveFailedError),
              (e) => new BadRequestException(e.message, { cause: e }),
            )
            .exhaustive(),
        ),
    );
  }

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
            .with(
              P.instanceOf(SaveFailedError),
              (e) => new BadRequestException(e.message, { cause: e }),
            )
            .exhaustive(),
        ),
    );
  }

  @Get(':institutionId')
  async getInstitution(
    @Param('tournamentId') tournamentIdRaw: string,
    @Param('institutionId') institutionIdRaw: number,
  ): Promise<NestInstitutionDto> {
    const result = await this.getInstitutionService.execute(
      TournamentId.init(tournamentIdRaw),
      InstitutionId.init(institutionIdRaw),
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
