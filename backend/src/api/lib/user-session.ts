import { BaseUserSession } from '@thallesp/nestjs-better-auth';

export type ActiveUserSession = BaseUserSession & {
  user: BaseUserSession['user'] & {
    role?: string | string[];
  };
  session: BaseUserSession['session'] & {
    activeOrganizationId: string;
  };
};
