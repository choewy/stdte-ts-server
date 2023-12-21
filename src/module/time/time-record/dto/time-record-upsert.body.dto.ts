import { Transform } from 'class-transformer';
import { IsDateString, IsInstance, IsNotEmpty, IsNumberString } from 'class-validator';

import { Project, TaskMainCategory, TaskSubCategory, User } from '@entity';
import { toEntity, toSQLDate, toStr } from '@server/common';

export class TimeRecordUpsertBodyDto {
  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => toSQLDate(value))
  date: string;

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
