import { RolePolicy, RolePolicyScopeMapResponseDto } from '@server/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthRolePolicyResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessRole: RolePolicyScopeMapResponseDto;

  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessTeam: RolePolicyScopeMapResponseDto;

  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessUser: RolePolicyScopeMapResponseDto;

  @ApiResponseProperty({ type: RolePolicyScopeMapResponseDto })
  accessProject: RolePolicyScopeMapResponseDto;

  constructor(rolePolicy: RolePolicy) {
    this.id = rolePolicy.id;
    this.accessRole = new RolePolicyScopeMapResponseDto(rolePolicy.accessRole);
    this.accessTeam = new RolePolicyScopeMapResponseDto(rolePolicy.accessTeam);
    this.accessUser = new RolePolicyScopeMapResponseDto(rolePolicy.accessUser);
    this.accessProject = new RolePolicyScopeMapResponseDto(rolePolicy.accessProject);
  }
}
