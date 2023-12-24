import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty } from 'class-validator';

import { toSQLDate } from '@server/common';

export class AnalysisDateRangeQuery {
  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => toSQLDate(value))
  s: string;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => toSQLDate(value))
  e: string;
}
