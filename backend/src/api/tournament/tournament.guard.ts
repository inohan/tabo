import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ListOrganizationTournamentService } from '@identity/service/list-tournaments';
import { HasActiveOrganization } from '../organization/active-organization.guard';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { throw_ } from 'src/lib/throw';
import { ActiveUserSession } from '../lib/user-session';

@Injectable()
export class TournamentGuard implements CanActivate {
  constructor(
    private listOrganizationTournamentService: ListOrganizationTournamentService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & {
      session: ActiveUserSession;
      user: ActiveUserSession['user'];
    } = context.switchToHttp().getRequest();
    // The existence of activeOrganizationId is gurantueed by activeOrganizationGuard
    const activeOrgId = request.session.session.activeOrganizationId;
    const currentTournament = request.params.tournamentId;
    if (!currentTournament) {
      return false;
    }
    const tournaments = await this.listOrganizationTournamentService.execute({
      organizationId: activeOrgId,
    });
    if (
      tournaments.match((t) => t, throw_).find((v) => v === currentTournament)
    ) {
      return true;
    }
    return false;
  }
}

export const TournamentAuth = () =>
  applyDecorators(
    HasActiveOrganization(),
    UseGuards(TournamentGuard),
    ApiForbiddenResponse({
      description: 'User is not authorized for the tournament.',
    }),
  );
