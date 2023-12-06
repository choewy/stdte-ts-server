import { Request as ExpressRequest } from 'express';

import { RolePolicy } from '@entity';

export type Request = ExpressRequest & {
  userId?: number | null;
};

export type PolicyLevelMap = Pick<
  RolePolicy,
  'accessCredentials' | 'accessRoleLevel' | 'accessTeamLevel' | 'accessUserLevel' | 'accessProjectLevel'
>;
