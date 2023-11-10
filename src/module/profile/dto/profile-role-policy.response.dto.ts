import { ApiResponseProperty } from '@nestjs/swagger';

import { RolePolicy, RolePolicyScopeMapResponseDto } from '@server/common';

export class ProfileRolePolicyResponseDto {
  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessRole: RolePolicyScopeMapResponseDto;

  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessUser: RolePolicyScopeMapResponseDto;

  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessTeam: RolePolicyScopeMapResponseDto;

  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessProject: RolePolicyScopeMapResponseDto;

  constructor(rolePolicy: RolePolicy) {
    this.accessRole = new RolePolicyScopeMapResponseDto(rolePolicy.accessRole);
    this.accessUser = new RolePolicyScopeMapResponseDto(rolePolicy.accessUser);
    this.accessTeam = new RolePolicyScopeMapResponseDto(rolePolicy.accessTeam);
    this.accessProject = new RolePolicyScopeMapResponseDto(rolePolicy.accessProject);
  }
}
