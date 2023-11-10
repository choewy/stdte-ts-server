import { ApiResponseProperty } from '@nestjs/swagger';

import { Role } from '@server/common';

import { AuthRolePolicyResponseDto } from './auth-role-policy.response.dto';

export class AuthRoleResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: AuthRolePolicyResponseDto })
  rolePolicy: AuthRolePolicyResponseDto;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.rolePolicy = new AuthRolePolicyResponseDto(role.rolePolicy);
  }
}
