import { Team } from '@server/common';

export class RoleUserTeamResponseDto {
  public readonly id: number;
  public readonly name: string;

  constructor(team: Team) {
    this.id = team.id;
    this.name = team.name;
  }
}
