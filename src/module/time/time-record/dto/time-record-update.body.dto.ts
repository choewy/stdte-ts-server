import { Transform } from 'class-transformer';
import { IsDate, IsInstance, IsNotEmpty, IsNumberString } from 'class-validator';

import { Project, TaskMainCategory, TaskSubCategory, User } from '@entity';
import { toDate, toEntity, toStr } from '@server/common';

export class TimeRecordUpdateBodyDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  date: Date;

  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ value }) => toStr(value))
  time: string;

  @IsNotEmpty()
  @IsInstance(User)
  @Transform(({ value }) => toEntity(User, value))
  user: User;

  @IsNotEmpty()
  @IsInstance(Project)
  @Transform(({ value }) => toEntity(Project, value))
  project: Project;

  @IsNotEmpty()
  @IsInstance(TaskMainCategory)
  @Transform(({ value }) => toEntity(TaskMainCategory, value))
  taskMainCategory: TaskMainCategory;

  @IsNotEmpty()
  @IsInstance(TaskMainCategory)
  @Transform(({ value }) => toEntity(TaskMainCategory, value))
  taskSubCategory: TaskSubCategory;
}
