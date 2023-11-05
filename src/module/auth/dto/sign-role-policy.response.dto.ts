import {
  MapResponseDto,
  RolePolicy,
  RolePolicyScopeText,
  RolePolicyScopeValue,
  toRolePolicyText,
} from '@server/common';

export class SignRolePolicyReponseDto {
  public readonly accessRole: MapResponseDto<RolePolicyScopeValue, RolePolicyScopeText>;
  public readonly accessUser: MapResponseDto<RolePolicyScopeValue, RolePolicyScopeText>;
  public readonly accessTeam: MapResponseDto<RolePolicyScopeValue, RolePolicyScopeText>;
  public readonly accessProject: MapResponseDto<RolePolicyScopeValue, RolePolicyScopeText>;

  constructor(rolePolicy: RolePolicy) {
    this.accessRole = new MapResponseDto(rolePolicy.accessRole, toRolePolicyText);
    this.accessUser = new MapResponseDto(rolePolicy.accessUser, toRolePolicyText);
    this.accessTeam = new MapResponseDto(rolePolicy.accessTeam, toRolePolicyText);
    this.accessProject = new MapResponseDto(rolePolicy.accessProject, toRolePolicyText);
  }
}
