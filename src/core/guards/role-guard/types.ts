import { RolePolicy, RolePolicyScope } from '@server/common';

export type SetRoleGuardMetadataKeys = keyof Pick<
  RolePolicy,
  'accessRole' | 'accessTeam' | 'accessUser' | 'accessProject'
>;

export type SetRoleGuardMetadataArgs = Partial<Record<SetRoleGuardMetadataKeys, RolePolicyScope>>;
