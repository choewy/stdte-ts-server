import { Transform } from 'class-transformer';
import { IsInstance, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

import { toEmptyNull, toTrim } from '@server/common';
import { TaskMainCategory } from '@entity';

export class TaskSubCategoryCreateBodyDto {
  @IsNotEmpty()
  @IsInstance(TaskMainCategory)
  @Transform(({ value }) => {
    if (value == null) {
      return value;
    }

    return { id: value };
  })
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
