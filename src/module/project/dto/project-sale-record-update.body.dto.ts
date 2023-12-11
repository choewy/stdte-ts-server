import { Transform } from 'class-transformer';
import { IsDate, IsNotIn, IsNumberString, IsOptional } from 'class-validator';

import { toDate, toEmptyNull, toStr } from '@server/common';

export class ProjectSaleRecordUpdateBodyDto {
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  @Transform(({ value }) => toEmptyNull(value))
  date?: Date | null;

  @IsOptional()
  @IsNumberString()
  @IsNotIn([null])
  @Transform(({ value }) => toStr(value))
  amount: string;
}
