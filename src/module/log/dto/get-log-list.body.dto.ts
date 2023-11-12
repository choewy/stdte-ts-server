import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { Order } from '@server/common';

export class GetLogListBodyDto {
  @ApiPropertyOptional({ type: Number, example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @ApiPropertyOptional({ type: Number, example: 20 })
  @IsOptional()
  @IsInt()
  @Max(100)
  take?: number;

  @ApiPropertyOptional({ type: String, isArray: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  methods?: string[];

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  statusCodes?: number[];

  @ApiPropertyOptional({ type: Number, enum: Order })
  @IsOptional()
  @IsInt()
  @IsEnum(Order)
  order?: Order;
}
