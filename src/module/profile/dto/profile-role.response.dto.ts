import { ApiResponseProperty } from '@nestjs/swagger';

import { Role, RolePolicy } from '@server/common';

import { ProfileRolePolicyResponseDto } from './profile-role-policy.response.dto';

export class ProfileRoleResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: ProfileRolePolicyResponseDto })
  policy: ProfileRolePolicyResponseDto = null;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;

    if (role.rolePolicy instanceof RolePolicy) {
      this.policy = new ProfileRolePolicyResponseDto(role.rolePolicy);
    }
  }
}
