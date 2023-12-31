import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInstance, IsNotIn, IsOptional, IsString } from 'class-validator';

import { Degree, Role } from '@entity';
import { toDate, toEmptyNull, toEntity, toTrim } from '@server/common';

export class UserUpdateBodyDto {
  @IsOptional()
  @IsNotIn([null])
  @IsString()
  @Transform(({ value }) => toTrim(value))
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  phone?: string | null;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  birthday?: Date | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  scienceNumber?: string | null;

  @IsOptional()
  @IsEnum(Degree)
  degree?: Degree | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  school?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  major?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  carType?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
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

  @IsOptional()
  @IsInstance(Role)
  @Transform(({ value }) => toEntity(Role, value))
  role?: Role;
}
