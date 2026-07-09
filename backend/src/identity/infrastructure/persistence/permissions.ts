import { createAccessControl } from 'better-auth/plugins/access';
import {
  adminAc,
  ownerAc,
  memberAc,
} from 'better-auth/plugins/organization/access';
import { statement } from '../../domain/models/permissions';

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  participants: ['create', 'update', 'delete'],
  discord: ['send'],
  roundStatus: ['view'],
  ...adminAc.statements,
});

export const owner = ac.newRole({
  participants: ['create', 'update', 'delete'],
  discord: ['send'],
  roundStatus: ['view'],
  ...ownerAc.statements,
});

export const member = ac.newRole({
  participants: ['view'],
  roundStatus: ['view'],
  ...memberAc.statements,
});
