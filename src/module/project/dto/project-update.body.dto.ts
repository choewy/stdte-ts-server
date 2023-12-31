import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInstance,
  IsNotIn,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { BusinessCategory, Customer, IndustryCategory, ProjectStatus, TaskMainCategory, User } from '@entity';
import { toDate, toEmptyNull, toEntities, toEntity, toStr, toTrim } from '@server/common';

export class ProjectUpdateBodyDto {
  @IsOptional()
  @IsString()
  @IsNotIn([null])
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  code?: string | null;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  description?: string | null;

  @IsOptional()
  @IsNumberString()
  @IsNotIn([null])
  @Transform(({ value }) => toStr(value))
  difficulty?: string;

  @IsOptional()
  @IsNumberString()
  @IsNotIn([null])
  @Transform(({ value }) => toStr(value))
  amount?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  @IsNotIn([null])
  status?: ProjectStatus;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  @Transform(({ value }) => toEmptyNull(value))
  startDate?: Date | null;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  @Transform(({ value }) => toEmptyNull(value))
  endDate?: Date | null;

  @IsOptional()
  @IsInstance(BusinessCategory)
  @Transform(({ value }) => toEntity(BusinessCategory, value))
  @Transform(({ value }) => toEmptyNull(value))
  businessCategory?: BusinessCategory | null;

  @IsOptional()
  @IsInstance(IndustryCategory)
  @Transform(({ value }) => toEntity(IndustryCategory, value))
  @Transform(({ value }) => toEmptyNull(value))
  industryCategory?: IndustryCategory | null;

  @IsOptional()
  @IsInstance(TaskMainCategory)
  @Transform(({ value }) => toEntity(TaskMainCategory, value))
  @Transform(({ value }) => toEmptyNull(value))
  taskCategory?: TaskMainCategory | null;

  @IsOptional()
  @IsInstance(Customer)
  @Transform(({ value }) => toEntity(Customer, value))
  @Transform(({ value }) => toEmptyNull(value))
  customer?: Customer | null;

  @IsOptional()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  externalManagers?: User[];

  @IsOptional()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  internalManagers?: User[];

  @IsOptional()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  internalLeaders?: User[];

  @IsOptional()
  @IsBoolean()
  canExpose?: boolean;
}
