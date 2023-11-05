import { Role, RolePolicy } from '@server/common';

import { SignRolePolicyReponseDto } from './sign-role-policy.response.dto';

export class SignRoleResponseDto {
  public readonly id: number;
  public readonly name: string;
  public readonly policy: SignRolePolicyReponseDto = null;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;

    if (role.rolePolicy instanceof RolePolicy) {
      this.policy = new SignRolePolicyReponseDto(role.rolePolicy);
    }
  }
}
