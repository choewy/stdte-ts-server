import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamBodyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @Length(50)
  name: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  @Min(1)
  leaderId?: number;

  @ApiPropertyOptional({ type: Number, isArray: true, example: [] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  memberIds?: number[];
}
