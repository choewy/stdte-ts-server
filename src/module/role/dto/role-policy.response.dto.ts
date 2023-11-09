import { ApiResponseProperty } from '@nestjs/swagger';

import { RolePolicy, RolePolicyScopeMapResponseDto } from '@server/common';

export class RolePolicyResponseDto {
  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessRole: RolePolicyScopeMapResponseDto;

  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessTeam: RolePolicyScopeMapResponseDto;

  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessUser: RolePolicyScopeMapResponseDto;

  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessProject: RolePolicyScopeMapResponseDto;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(rolePolicy: RolePolicy) {
    this.accessRole = new RolePolicyScopeMapResponseDto(rolePolicy.accessRole);
    this.accessTeam = new RolePolicyScopeMapResponseDto(rolePolicy.accessTeam);
    this.accessUser = new RolePolicyScopeMapResponseDto(rolePolicy.accessUser);
    this.accessProject = new RolePolicyScopeMapResponseDto(rolePolicy.accessProject);
    this.updatedAt = rolePolicy.updatedAt;
  }
}
