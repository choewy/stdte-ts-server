import { Transform } from 'class-transformer';
import { IsNotIn, IsOptional, IsString } from 'class-validator';

import { toEmptyNull, toTrim } from '@server/common';

export class CustomerUpdateBodyDto {
  @IsOptional()
  @IsString()
  @IsNotIn([null])
  @Transform(({ value }) => toTrim(value))
  kr?: string;

  @IsOptional()
  @IsString()
  @IsNotIn([null])
  @Transform(({ value }) => toTrim(value))
  en?: string;

  @IsOptional()
  @IsString()
  @IsNotIn([null])
  @Transform(({ value }) => toTrim(value))
  alias?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  description?: string | null;
}
