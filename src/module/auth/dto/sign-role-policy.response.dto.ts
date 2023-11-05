import { MapDto, RolePolicy, RolePolicyScopeText, RolePolicyScopeValue, toRolePolicyText } from '@server/common';

export class SignRolePolicyReponseDto {
  public readonly accessRole: MapDto<RolePolicyScopeValue, RolePolicyScopeText>;
  public readonly accessUser: MapDto<RolePolicyScopeValue, RolePolicyScopeText>;
  public readonly accessTeam: MapDto<RolePolicyScopeValue, RolePolicyScopeText>;
  public readonly accessProject: MapDto<RolePolicyScopeValue, RolePolicyScopeText>;

  constructor(rolePolicy: RolePolicy) {
    this.accessRole = new MapDto(rolePolicy.accessRole, toRolePolicyText);
    this.accessUser = new MapDto(rolePolicy.accessUser, toRolePolicyText);
    this.accessTeam = new MapDto(rolePolicy.accessTeam, toRolePolicyText);
    this.accessProject = new MapDto(rolePolicy.accessProject, toRolePolicyText);
  }
}
