import { auth } from '@identity/infrastructure/persistence/auth';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService, UserSession } from '@thallesp/nestjs-better-auth';
import { Request } from 'express';
import { ListTournamentService } from '@identity/service/list-tournaments';

@Injectable()
export class TournamentGuard implements CanActivate {
  constructor(
    private authService: AuthService<typeof auth>,
    private listTournamentService: ListTournamentService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & {
      session?: UserSession;
      user?: UserSession['user'];
    } = context.switchToHttp().getRequest();
    const activeOrgId = request.session?.session.activeOrganizationId;
    if (!activeOrgId) {
      return false;
    }
    const currentTournament = request.params.tournamentId;
    if (!currentTournament) {
      return false;
    }
    const tournaments = await this.listTournamentService.execute({
      organizationId: activeOrgId,
    });
    if (tournaments.find((v) => v === currentTournament)) {
      return true;
    }
    return false;
  }
}
