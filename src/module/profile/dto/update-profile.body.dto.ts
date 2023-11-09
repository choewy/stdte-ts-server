import { IsDate, IsEnum, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { DegreeValue, GenderCode, toEnumValues } from '@server/common';

export class UpdateProfileBodyDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @Length(13, 13)
  phone?: string;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  birthday?: Date;

  @ApiPropertyOptional({ type: Number, enum: toEnumValues(GenderCode, Number) })
  @IsOptional()
  @IsEnum(GenderCode)
  genderCode?: GenderCode;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @Length(8, 8)
  scienceCode?: string;

  @ApiPropertyOptional({ type: Number, enum: toEnumValues(DegreeValue, Number) })
  @IsOptional()
  @IsEnum(DegreeValue)
  degreeValue?: DegreeValue;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  school?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  major?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  carType?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  carNumber?: string;
}
