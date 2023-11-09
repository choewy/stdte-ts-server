import { ApiResponseProperty } from '@nestjs/swagger';

import { Team, User } from '@server/common';

import { RoleUserTeamResponseDto } from './role-user-team.response.dto';

export class RoleUserResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: RoleUserTeamResponseDto })
  team: RoleUserTeamResponseDto = null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;

    if (user.team instanceof Team) {
      this.team = new RoleUserTeamResponseDto(user.team);
    }
  }
}
