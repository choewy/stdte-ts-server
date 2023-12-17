import { Transform } from 'class-transformer';
import { IsInstance, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

import { TaskMainCategory } from '@entity';
import { toEmptyNull, toEntity, toTrim } from '@server/common';

export class TaskSubCategoryCreateBodyDto {
  @IsNotEmpty()
  @IsInstance(TaskMainCategory)
  @Transform(({ value }) => toEntity(TaskMainCategory, value))
  parent: TaskMainCategory;

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
