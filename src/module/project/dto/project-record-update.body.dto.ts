import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { toDate, toEmptyNull, toStr, toTrim } from '@server/common';

export class ProjectRecordUpdateBodyDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  date: Date | null;

  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ value }) => toStr(value))
  amount: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  description: string | null;
}
