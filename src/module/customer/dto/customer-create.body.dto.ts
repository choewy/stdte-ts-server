import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { toEmptyNull, toTrim } from '@server/common';

export class CustomerCreateBodyDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  kr: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  en: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  alias: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  description: string | null;
}
