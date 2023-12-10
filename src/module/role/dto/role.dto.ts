import { Role } from '@entity';
import { toISO } from '@server/common';

import { RolePolicyDto } from './role-policy.dto';

export class RoleDto {
  id: number;
  name: string;
  users: number;
  createdAt: string | null;
  updatedAt: string | null;
  rolePolicy: RolePolicyDto;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.users = role.users.length;
    this.rolePolicy = new RolePolicyDto(role.policy);
    this.createdAt = toISO(role.createdAt);
    this.updatedAt = toISO(role.updatedAt);
  }
}
