import { Role } from '@entity';
import { toISOString } from '@server/common';

import { RolePolicyDto } from './role-policy.dto';
import { RoleUserDto } from './role-user.dto';

export class RoleDto {
  id: number;
  name: string;
  users: RoleUserDto[];
  rolePolicy?: RolePolicyDto;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.users = role.users.map((user) => new RoleUserDto(user));

    if (role.policy) {
      this.rolePolicy = new RolePolicyDto(role.policy);
    }

    this.createdAt = toISOString(role.createdAt);
    this.updatedAt = toISOString(role.updatedAt);
  }
}
