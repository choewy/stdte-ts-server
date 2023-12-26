import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty } from 'class-validator';

import { toSQLWithYear } from '@server/common';

export class AnalysisDateRangeQuery {
  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => toSQLWithYear('s', value))
  s: string;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => toSQLWithYear('e', value))
  e: string;
}
