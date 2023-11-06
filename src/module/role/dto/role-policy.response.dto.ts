import {
  MapResponseDto,
  RolePolicy,
  RolePolicyScopeText,
  RolePolicyScopeValue,
  toRolePolicyText,
} from '@server/common';

export class RolePolicyResponseDto {
  public readonly accessRole: MapResponseDto<RolePolicyScopeValue, RolePolicyScopeText>;
  public readonly accessTeam: MapResponseDto<RolePolicyScopeValue, RolePolicyScopeText>;
  public readonly accessUser: MapResponseDto<RolePolicyScopeValue, RolePolicyScopeText>;
  public readonly accessProject: MapResponseDto<RolePolicyScopeValue, RolePolicyScopeText>;
  public readonly updatedAt: Date;

  constructor(rolePolicy: RolePolicy) {
    this.accessRole = new MapResponseDto(rolePolicy.accessRole, toRolePolicyText);
    this.accessTeam = new MapResponseDto(rolePolicy.accessTeam, toRolePolicyText);
    this.accessUser = new MapResponseDto(rolePolicy.accessUser, toRolePolicyText);
    this.accessProject = new MapResponseDto(rolePolicy.accessProject, toRolePolicyText);
    this.updatedAt = rolePolicy.updatedAt;
  }
}
