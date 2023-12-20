import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInstance, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { Project } from '@entity';
import { toDate, toEmptyNull, toEntity, toStr, toTrim } from '@server/common';

import { ProjectRecordType } from '../enums';

export class ProjectRecordCreateBodyDto {
  @IsNotEmpty()
  @IsInstance(Project)
  @Transform(({ value }) => toEntity(Project, value))
  @Transform(({ value }) => toEmptyNull(value))
  project: Project;

  @IsNotEmpty()
  @IsEnum(ProjectRecordType)
  type: ProjectRecordType;

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
