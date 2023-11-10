import { ApiResponseProperty } from '@nestjs/swagger';

import { Role } from '@server/common';

import { RolePolicyResponseDto } from './role-policy.response.dto';
import { RoleUserResponseDto } from './role-user.response.dto';

export class RoleResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  @ApiResponseProperty({ type: RolePolicyResponseDto })
  rolePolicy: RolePolicyResponseDto;

  @ApiResponseProperty({ type: [RoleUserResponseDto] })
  users: RoleUserResponseDto[];

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
    this.rolePolicy = new RolePolicyResponseDto(role.rolePolicy);
    this.users = role.users.map((user) => new RoleUserResponseDto(user));
  }
}
