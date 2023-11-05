import { RolePolicy, RolePolicyScopeText, toRolePolicyText } from '@server/common';

export class ProfileRolePolicyResponseDto {
  public readonly accessRole: RolePolicyScopeText;
  public readonly accessUser: RolePolicyScopeText;
  public readonly accessTeam: RolePolicyScopeText;
  public readonly accessProject: RolePolicyScopeText;

  constructor(rolePolicy: RolePolicy) {
    this.accessRole = toRolePolicyText(rolePolicy.accessRole);
    this.accessUser = toRolePolicyText(rolePolicy.accessUser);
    this.accessTeam = toRolePolicyText(rolePolicy.accessTeam);
    this.accessProject = toRolePolicyText(rolePolicy.accessProject);
  }
}
