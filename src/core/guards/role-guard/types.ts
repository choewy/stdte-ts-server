import { RolePolicy, RolePolicyScopeValue } from '@server/common';

export type SetRoleGuardMetadataKeys = keyof Pick<
  RolePolicy,
  'accessRole' | 'accessTeam' | 'accessUser' | 'accessProject'
>;

export type SetRoleGuardMetadataArgs = Partial<Record<SetRoleGuardMetadataKeys, RolePolicyScopeValue>>;
