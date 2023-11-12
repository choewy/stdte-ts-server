import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListQueryDto {
  @ApiPropertyOptional({ type: Number, example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  skip: number;

  @ApiPropertyOptional({ type: Number, example: 20 })
  @IsOptional()
  @IsInt()
  @Max(100)
  @Type(() => Number)
  take: number;

  constructor() {
    this.skip = 0;
    this.take = 20;
  }
}
