import { Role, RolePolicy } from '@server/common';

import { ProfileRolePolicyResponseDto } from './profile-role-policy.response.dto';

export class ProfileRoleResponseDto {
  public readonly id: number;
  public readonly name: string;
  public readonly policy: ProfileRolePolicyResponseDto = null;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;

    if (role.rolePolicy instanceof RolePolicy) {
      this.policy = new ProfileRolePolicyResponseDto(role.rolePolicy);
    }
  }
}
