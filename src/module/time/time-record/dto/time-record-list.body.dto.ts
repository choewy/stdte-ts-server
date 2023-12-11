import { DateTime } from 'luxon';
import { Transform } from 'class-transformer';
import { IsDateString, IsInstance, IsNotEmpty } from 'class-validator';

import { toEntity, toSQLDate } from '@server/common';
import { User } from '@entity';

export class TimeRecordListBodyDto {
  @IsNotEmpty()
  @IsInstance(User)
  @Transform(({ value }) => toEntity(User, value))
  user: User;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => toSQLDate(value))
  s = DateTime.local().startOf('week').toSQLDate() as string;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => toSQLDate(value))
  e = DateTime.local().endOf('week').toSQLDate() as string;
}
