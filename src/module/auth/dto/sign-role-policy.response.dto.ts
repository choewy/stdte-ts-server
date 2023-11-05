import { RolePolicy, RolePolicyScopeText, toRolePolicyText } from '@server/common';

export class SignRolePolicyReponseDto {
  accessRole: RolePolicyScopeText;
  accessUser: RolePolicyScopeText;
  accessTeam: RolePolicyScopeText;
  accessProject: RolePolicyScopeText;

  constructor(rolePolicy: RolePolicy) {
    this.accessProject = toRolePolicyText(rolePolicy.accessProject);
    this.accessUser = toRolePolicyText(rolePolicy.accessUser);
    this.accessTeam = toRolePolicyText(rolePolicy.accessTeam);
    this.accessProject = toRolePolicyText(rolePolicy.accessProject);
  }
}
