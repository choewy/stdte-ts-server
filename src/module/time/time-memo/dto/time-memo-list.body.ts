import { DateTime } from 'luxon';
import { Transform } from 'class-transformer';
import { IsDateString, IsInstance, IsNotEmpty } from 'class-validator';

import { User } from '@entity';
import { toEntity, toSQLDate } from '@server/common';

export class TimeMemoListBodyDto {
  @IsNotEmpty()
  @IsInstance(User)
  @Transform(({ value }) => toEntity(User, value))
  user: User;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => toSQLDate(value))
  s = DateTime.local().startOf('week').toSQLDate();

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => toSQLDate(value))
  e = DateTime.local().endOf('week').toSQLDate();
}
