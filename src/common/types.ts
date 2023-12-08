import { Request as ExpressRequest } from 'express';

import { RolePolicy, User } from '@entity';

export type Request = ExpressRequest & {
  userId?: number | null;
  user?: User | null;
};

export type PolicyLevelMap = Pick<
  RolePolicy,
  'accessCredentials' | 'accessRoleLevel' | 'accessUserLevel' | 'accessProjectLevel'
>;
