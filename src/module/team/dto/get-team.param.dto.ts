import { IsNotEmpty, IsInt, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GetTeamParamDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
