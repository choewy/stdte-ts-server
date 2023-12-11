import { Transform } from 'class-transformer';
import { IsDateString, IsInstance, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { User } from '@entity';
import { toEmptyNull, toEntity, toSQLDate } from '@server/common';

export class TimeMemoUpdateBodyDto {
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
