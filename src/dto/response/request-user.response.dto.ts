import { ApiResponseProperty } from '@nestjs/swagger';

import { AuthStatus, EmploymentStatus, Role, RolePolicy, RolePolicyScope, Team, User } from '@server/common';

export class RequestUserTeamResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  constructor(team: Team) {
    this.id = team.id;
    this.name = team.name;
  }
}

export class RequestUserRolePolicyResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessRole: RolePolicyScope;

  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessTeam: RolePolicyScope;

  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessUser: RolePolicyScope;

  @ApiResponseProperty({ type: Number, example: Object.values(RolePolicyScope).join(' | ') })
  accessProject: RolePolicyScope;

  constructor(rolePolicy: RolePolicy) {
    this.id = rolePolicy.id;
    this.accessRole = rolePolicy.accessRole;
    this.accessTeam = rolePolicy.accessTeam;
    this.accessUser = rolePolicy.accessUser;
    this.accessProject = rolePolicy.accessProject;
  }
}

export class RequestUserRoleResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: RequestUserRolePolicyResponseDto })
  rolePolicy: RequestUserRolePolicyResponseDto;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.rolePolicy = new RequestUserRolePolicyResponseDto(role.rolePolicy);
  }
}

export class RequestUserResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String, example: Object.values(AuthStatus).join(' | ') })
  authStatus: AuthStatus;

  @ApiResponseProperty({ type: String, example: Object.values(EmploymentStatus).join(' | ') })
  employmentStatus: EmploymentStatus;

  @ApiResponseProperty({ type: RequestUserRoleResponseDto })
  role: RequestUserRoleResponseDto = null;

  @ApiResponseProperty({ type: RequestUserTeamResponseDto })
  team: RequestUserTeamResponseDto = null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.authStatus = user.authStatus;
    this.employmentStatus = user.employmentStatus;

    if (user.role) {
      this.role = new RequestUserRoleResponseDto(user.role);
    }

    if (user.team) {
      this.team = new RequestUserTeamResponseDto(user.team);
    }
  }
}
