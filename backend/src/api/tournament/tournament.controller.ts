import { Controller, Get, Inject } from '@nestjs/common';
import { MemberHasPermission } from '@thallesp/nestjs-better-auth';
import { Permission } from '@identity/domain/models';
import { ListTournamentService } from '@identity/service/list-tournaments';

@Controller('tournaments')
export class TournamentController {
  @MemberHasPermission({} as Permission)
  @Get()
  async listTournaments(
    @Inject() listTournamentService: ListTournamentService,
  ) {
    listTournamentService.execute();
  }
}
