import { ApiResponseProperty } from '@nestjs/swagger';

import {
  AUTH_STATUS_TEXTS,
  EMPLOYMENT_STATUS_TEXTS,
  ROLE_POLICY_SCOPE_TEXTS,
  Role,
  RolePolicy,
  Team,
  User,
} from '@server/common';

import { EnumMapResponseDto } from './enum-map.response.dto';

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

  @ApiResponseProperty({ type: EnumMapResponseDto })
  accessRole: EnumMapResponseDto;

  @ApiResponseProperty({ type: EnumMapResponseDto })
  accessTeam: EnumMapResponseDto;

  @ApiResponseProperty({ type: EnumMapResponseDto })
  accessUser: EnumMapResponseDto;

  @ApiResponseProperty({ type: EnumMapResponseDto })
  accessProject: EnumMapResponseDto;

  constructor(rolePolicy: RolePolicy) {
    this.id = rolePolicy.id;
    this.accessRole = new EnumMapResponseDto(rolePolicy.accessRole, ROLE_POLICY_SCOPE_TEXTS);
    this.accessTeam = new EnumMapResponseDto(rolePolicy.accessTeam, ROLE_POLICY_SCOPE_TEXTS);
    this.accessUser = new EnumMapResponseDto(rolePolicy.accessUser, ROLE_POLICY_SCOPE_TEXTS);
    this.accessProject = new EnumMapResponseDto(rolePolicy.accessProject, ROLE_POLICY_SCOPE_TEXTS);
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

  @ApiResponseProperty({ type: EnumMapResponseDto })
  authStatus: EnumMapResponseDto;

  @ApiResponseProperty({ type: EnumMapResponseDto })
  employmentStatus: EnumMapResponseDto;

  @ApiResponseProperty({ type: RequestUserRoleResponseDto })
  role: RequestUserRoleResponseDto = null;

  @ApiResponseProperty({ type: RequestUserTeamResponseDto })
  team: RequestUserTeamResponseDto = null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.authStatus = new EnumMapResponseDto(user.authStatus, AUTH_STATUS_TEXTS);
    this.employmentStatus = new EnumMapResponseDto(user.employmentStatus, EMPLOYMENT_STATUS_TEXTS);

    if (user.role) {
      this.role = new RequestUserRoleResponseDto(user.role);
    }

    if (user.team) {
      this.team = new RequestUserTeamResponseDto(user.team);
    }
  }
}
