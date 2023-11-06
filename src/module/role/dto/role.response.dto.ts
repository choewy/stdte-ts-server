import { Role } from '@server/common';

import { RolePolicyResponseDto } from './role-policy.response.dto';
import { RoleUserResponseDto } from './role-user.response.dto';

export class RoleResponseDto {
  public readonly id: number;
  public readonly name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly rolePolicy: RolePolicyResponseDto;
  public readonly users: RoleUserResponseDto[];

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
    this.rolePolicy = new RolePolicyResponseDto(role.rolePolicy);
    this.users = role.users.map((user) => new RoleUserResponseDto(user));
  }
}
