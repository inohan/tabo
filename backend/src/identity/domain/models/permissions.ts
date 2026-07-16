import { defaultStatements } from 'better-auth/plugins/organization/access';

export const statement = {
  ...defaultStatements,
  participants: ['create', 'view', 'update', 'delete'],
  discord: ['send'],
  roundStatus: ['view'],
} as const;

type AllPermissions = typeof statement;

export type Permission = {
  readonly [K in keyof AllPermissions]?: AllPermissions[K][number][];
};
