import { Role, RolePolicy } from '@server/common';

import { SignRolePolicyReponseDto } from './sign-role-policy.response.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SignRoleResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: SignRolePolicyReponseDto })
  policy: SignRolePolicyReponseDto = null;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;

    if (role.rolePolicy instanceof RolePolicy) {
      this.policy = new SignRolePolicyReponseDto(role.rolePolicy);
    }
  }
}
