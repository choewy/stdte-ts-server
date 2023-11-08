import { RolePolicy, RolePolicyScopeMapResponseDto } from '@server/common';

export class RolePolicyResponseDto {
  public readonly accessRole: RolePolicyScopeMapResponseDto;
  public readonly accessTeam: RolePolicyScopeMapResponseDto;
  public readonly accessUser: RolePolicyScopeMapResponseDto;
  public readonly accessProject: RolePolicyScopeMapResponseDto;
  public readonly updatedAt: Date;

  constructor(rolePolicy: RolePolicy) {
    this.accessRole = new RolePolicyScopeMapResponseDto(rolePolicy.accessRole);
    this.accessTeam = new RolePolicyScopeMapResponseDto(rolePolicy.accessTeam);
    this.accessUser = new RolePolicyScopeMapResponseDto(rolePolicy.accessUser);
    this.accessProject = new RolePolicyScopeMapResponseDto(rolePolicy.accessProject);
    this.updatedAt = rolePolicy.updatedAt;
  }
}
