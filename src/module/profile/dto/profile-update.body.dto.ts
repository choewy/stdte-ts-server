import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotIn, IsOptional, IsString } from 'class-validator';

import { GenderCode, Degree } from '@entity';
import { toDate, toEmptyNull } from '@server/common';

import { ProfileProperty } from './types';

export class ProfileUpdateBodyDto implements Partial<Omit<ProfileProperty, 'status'>> {
  @IsOptional()
  @IsNotIn([null])
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toEmptyNull(value))
  phone?: string | null;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  birthday?: Date | null;

  @IsOptional()
  @IsEnum(GenderCode)
  genderCode?: GenderCode | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toEmptyNull(value))
  scienceCode?: string | null;

  @IsOptional()
  @IsEnum(Degree)
  degree?: Degree | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toEmptyNull(value))
  school?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toEmptyNull(value))
  major?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toEmptyNull(value))
  carType?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toEmptyNull(value))
  carNumber?: string | null;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  enteringDay?: Date | null;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  resignationDay?: Date | null;
}
