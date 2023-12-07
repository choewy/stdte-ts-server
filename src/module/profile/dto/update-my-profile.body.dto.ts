import { IsDateString, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

import { Degree, GenderCode } from '@entity';

export class UpdateMyProfileBodyDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string | null;

  @IsOptional()
  @IsDateString()
  birthday?: Date | null;

  @IsOptional()
  @IsEnum(GenderCode)
  genderCode?: GenderCode | null;

  @IsOptional()
  @IsString()
  scienceCode?: string | null;

  @IsOptional()
  @IsEnum(Degree)
  degree?: Degree;

  @IsOptional()
  @IsString()
  school?: string | null;

  @IsOptional()
  @IsString()
  major?: string | null;

  @IsOptional()
  @IsString()
  carType?: string | null;

  @IsOptional()
  @IsString()
  carNumber?: string | null;
}
