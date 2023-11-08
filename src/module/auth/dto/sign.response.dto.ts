import { ApiResponseProperty } from '@nestjs/swagger';

import { AuthStatusMapResponseDto, EmploymentStatusMapResponseDto, Role, Team, User } from '@server/common';

import { SignTokenResponseDto } from './sign-token.response.dto';
import { SignRoleResponseDto } from './sign-role.response.dto';
import { SignTeamResponseDto } from './sign-team.response.dto';

export class SignResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: AuthStatusMapResponseDto })
  authStatus: AuthStatusMapResponseDto;

  @ApiResponseProperty({ type: EmploymentStatusMapResponseDto })
  employmentStatus: EmploymentStatusMapResponseDto;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: SignRoleResponseDto })
  role: SignRoleResponseDto = null;

  @ApiResponseProperty({ type: SignTeamResponseDto })
  team: SignTeamResponseDto = null;

  @ApiResponseProperty({ type: SignTokenResponseDto })
  tokens?: SignTokenResponseDto;

  constructor(user: User, access: string, refresh: string, withTokens = false) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.authStatus = new AuthStatusMapResponseDto(user.authStatus);
    this.employmentStatus = new EmploymentStatusMapResponseDto(user.employmentStatus);
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
