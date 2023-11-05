import {
  AuthStatusText,
  AuthStatusValue,
  EmploymentStatusText,
  EmploymentStatusValue,
  MapDto,
  Role,
  Team,
  User,
  toAuthStatusText,
  toEmploymentStatusText,
} from '@server/common';

import { SignTokenResponseDto } from './sign-token.response.dto';
import { SignRoleResponseDto } from './sign-role.response.dto';
import { SignTeamResponseDto } from './sign-team.response.dto';

export class SignResponseDto {
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;
  public readonly authStatus: MapDto<AuthStatusValue, AuthStatusText>;
  public readonly employmentStatus: MapDto<EmploymentStatusValue, EmploymentStatusText>;
  public readonly createdAt: Date;
  public readonly role: SignRoleResponseDto = null;
  public readonly team: SignTeamResponseDto = null;
  public readonly tokens?: SignTokenResponseDto;

  constructor(user: User, access: string, refresh: string, withTokens = false) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.authStatus = new MapDto(user.authStatus, toAuthStatusText);
    this.employmentStatus = new MapDto(user.employmentStatus, toEmploymentStatusText);
    this.createdAt = user.createdAt;

    if (user.role instanceof Role) {
      this.role = new SignRoleResponseDto(user.role);
    }

    if (user.team instanceof Team) {
      this.team = new SignTeamResponseDto(user.team);
    }

    if (withTokens) {
      this.tokens = new SignTokenResponseDto(access, refresh);
    }
  }
}
