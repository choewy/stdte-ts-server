import { Role } from '@entity';
import { toISOString } from '@server/common';

import { CredentialsRolePolicyDto } from './credentials-role-policy.dto';

export class CredentialsRoleDto {
  id: number;
  name: string;
  rolePolicy: CredentialsRolePolicyDto;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.rolePolicy = new CredentialsRolePolicyDto(role.policy);
    this.createdAt = toISOString(role.createdAt);
    this.updatedAt = toISOString(role.updatedAt);
  }
}
