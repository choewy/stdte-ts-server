import { IsDate, IsEnum, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

import { DegreeValue, GenderCode } from '@server/common';

export class UpdateProfileBodyDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(13, 13)
  phone?: string;

  @IsOptional()
  @IsDate()
  birthday?: Date;

  @IsOptional()
  @IsEnum(GenderCode)
  genderCode?: GenderCode;

  @IsOptional()
  @IsString()
  @Length(8, 8)
  scienceCode?: string;

  @IsOptional()
  @IsEnum(DegreeValue)
  degreeValue?: DegreeValue;

  @IsOptional()
  @IsString()
  school?: string;

  @IsOptional()
  @IsString()
  major?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  carType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  carNumber?: string;
}
