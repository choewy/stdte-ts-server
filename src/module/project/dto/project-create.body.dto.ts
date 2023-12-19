import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInstance,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { BusinessCategory, Customer, IndustryCategory, ProjectStatus, TaskMainCategory, User } from '@entity';
import { toDate, toEmptyNull, toEntities, toEntity, toStr, toTrim } from '@server/common';

export class ProjectCreateBodyDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  code: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  @Transform(({ value }) => toEmptyNull(value))
  description: string | null;

  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ value }) => toStr(value))
  difficulty: string;

  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ value }) => toStr(value))
  amount: string;

  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  @Transform(({ value }) => toEmptyNull(value))
  startDate: Date | null;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => toDate(value))
  @Transform(({ value }) => toEmptyNull(value))
  endDate: Date | null;

  @IsOptional()
  @IsInstance(Customer)
  @Transform(({ value }) => toEntity(Customer, value))
  @Transform(({ value }) => toEmptyNull(value))
  customer: Customer | null;

  @IsOptional()
  @IsInstance(BusinessCategory)
  @Transform(({ value }) => toEntity(BusinessCategory, value))
  @Transform(({ value }) => toEmptyNull(value))
  businessCategory: BusinessCategory | null;

  @IsOptional()
  @IsInstance(IndustryCategory)
  @Transform(({ value }) => toEntity(IndustryCategory, value))
  @Transform(({ value }) => toEmptyNull(value))
  industryCategory: IndustryCategory | null;

  @IsOptional()
  @IsInstance(TaskMainCategory)
  @Transform(({ value }) => toEntity(TaskMainCategory, value))
  @Transform(({ value }) => toEmptyNull(value))
  taskCategory: TaskMainCategory | null;

  @IsNotEmpty()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  internalOwners: User[];

  @IsNotEmpty()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  internalManagers: User[];

  @IsNotEmpty()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  internalLeaders: User[];

  @IsNotEmpty()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  externalOwners: User[];

  @IsNotEmpty()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  externalManagers: User[];

  @IsNotEmpty()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  externalLeaders: User[];

  @IsNotEmpty()
  @IsBoolean()
  canExpose: boolean;
}
