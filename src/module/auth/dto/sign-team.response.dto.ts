import { ApiResponseProperty } from '@nestjs/swagger';

import { Team } from '@server/common';

export class SignTeamResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  constructor(team: Team) {
    this.id = team.id;
    this.name = team.name;
  }
}
