import { Team, User } from '@server/common';

import { RoleUserTeamResponseDto } from './role-user-team.response.dto';

export class RoleUserResponseDto {
  public readonly id: number;
  public readonly email: string;
  public readonly name: string;
  public readonly team: RoleUserTeamResponseDto = null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;

    if (user.team instanceof Team) {
      this.team = new RoleUserTeamResponseDto(user.team);
    }
  }
}
