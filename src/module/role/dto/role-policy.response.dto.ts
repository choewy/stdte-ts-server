import { ApiResponseProperty } from '@nestjs/swagger';

import { RolePolicy, RolePolicyScope } from '@server/common';

export class RolePolicyResponseDto {
  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessRole: RolePolicyScope;

  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessTeam: RolePolicyScope;

  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessUser: RolePolicyScope;

  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessProject: RolePolicyScope;

  constructor(rolePolicy: RolePolicy) {
    this.accessRole = rolePolicy.accessRole;
    this.accessTeam = rolePolicy.accessTeam;
    this.accessUser = rolePolicy.accessUser;
    this.accessProject = rolePolicy.accessProject;
  }
}
