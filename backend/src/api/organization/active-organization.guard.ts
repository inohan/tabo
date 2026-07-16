import {
  applyDecorators,
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { ApiConflictResponse } from '@nestjs/swagger';
import { UserSession } from '@thallesp/nestjs-better-auth';

@Injectable()
export class ActiveOrganizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request & {
      session: UserSession;
      user: UserSession['user'];
    } = context.switchToHttp().getRequest();
    if (!request.session.session.activeOrganizationId) {
      throw new ConflictException('Active organization not set.');
    }
    return true;
  }
}

export const HasActiveOrganization = () =>
  applyDecorators(
    UseGuards(ActiveOrganizationGuard),
    ApiConflictResponse({ description: 'Active organization not set.' }),
  );
