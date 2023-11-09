import { IsInt, IsNotEmpty, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GetRoleParamDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
