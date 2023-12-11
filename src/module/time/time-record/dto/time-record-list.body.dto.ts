import { DateTime } from 'luxon';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

import { toDate } from '@server/common';

export class TimeRecordListBodyDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  s = DateTime.local().startOf('week').toJSDate();

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  e = DateTime.local().endOf('week').toJSDate();
}
