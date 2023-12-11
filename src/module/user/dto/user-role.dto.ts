import { Role } from '@entity';
import { toISOString } from '@server/common';

import { UserRolePolicyDto } from './user-role-policy.dto';

export class UserRoleDto {
  id: number;
  name: string;
  rolePolicy: UserRolePolicyDto;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.rolePolicy = new UserRolePolicyDto(role.policy);
    this.createdAt = toISOString(role.createdAt);
    this.updatedAt = toISOString(role.updatedAt);
  }
}
