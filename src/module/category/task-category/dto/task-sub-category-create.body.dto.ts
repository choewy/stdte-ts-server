import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

import { toEmptyNull, toTrim } from '@server/common';

export class TaskSubCategoryCreateBodyDto {
  @IsNotEmpty()
  @IsInt()
  mainCategory: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => toTrim(value))
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  description: string | null;
}
