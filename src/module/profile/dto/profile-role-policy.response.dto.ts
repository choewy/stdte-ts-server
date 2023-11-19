import { ApiResponseProperty } from '@nestjs/swagger';

import { RolePolicy, RolePolicyScope } from '@server/common';

export class ProfileRolePolicyResponseDto {
  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessRole: RolePolicyScope;

  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessUser: RolePolicyScope;

  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessTeam: RolePolicyScope;

  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessProject: RolePolicyScope;

  constructor(rolePolicy: RolePolicy) {
    this.accessRole = rolePolicy.accessRole;
    this.accessUser = rolePolicy.accessUser;
    this.accessTeam = rolePolicy.accessTeam;
    this.accessProject = rolePolicy.accessProject;
  }
}
