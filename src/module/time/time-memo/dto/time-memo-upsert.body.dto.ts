import { Transform } from 'class-transformer';
import { IsDateString, IsInstance, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { User } from '@entity';
import { toEmptyNull, toEntity, toSQLDate } from '@server/common';

export class TimeMemoUpsertBodyDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  id: number | null;

  @IsNotEmpty()
  @IsInstance(User)
  @Transform(({ value }) => toEntity(User, value))
  user: User;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => toSQLDate(value))
  date: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toEmptyNull(value))
  text: string;
}
