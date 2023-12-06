import { Request as ExpressRequest } from 'express';

import { RolePolicy } from '@entity';

export type Request = ExpressRequest & {
  userId?: number | null;
};

export type PolicyLevelMetadataValue = Pick<
  RolePolicy,
  'accessRoleLevel' | 'accessTeamLevel' | 'accessUserLevel' | 'accessProjectLevel'
>;
