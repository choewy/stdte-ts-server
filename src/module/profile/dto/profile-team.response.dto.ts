import { Team } from '@server/common';

export class ProfileTeamResponseDto {
  public readonly id: number;
  public readonly name: string;

  constructor(team: Team) {
    this.id = team.id;
    this.name = team.name;
  }
}
