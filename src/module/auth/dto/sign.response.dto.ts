import {
  AuthStatusText,
  EmploymentStatusText,
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
  public readonly authStatus: AuthStatusText;
  public readonly employmentStatus: EmploymentStatusText;
  public readonly createdAt: Date;
  public readonly role: SignRoleResponseDto = null;
  public readonly team: SignTeamResponseDto = null;
  public readonly tokens?: SignTokenResponseDto;

  constructor(user: User, access: string, refresh: string, withTokens = false) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.authStatus = toAuthStatusText(user.authStatus);
    this.employmentStatus = toEmploymentStatusText(user.employmentStatus);
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
