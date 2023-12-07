import { IsArray, IsDateString, IsEnum, IsInt, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { ProjectScope, ProjectStatus } from '@entity';

export class UpdateProjectBodyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsEnum(ProjectScope)
  scope?: ProjectScope;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsString()
  orderer?: string | null;

  @IsOptional()
  @IsString()
  summary?: string | null;

  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => {
    if (value === undefined) {
      return undefined;
    }

    if (Number.isNaN(value)) {
      return null;
    }

    return BigInt(value).toString();
  })
  income?: bigint | null;

  @IsOptional()
  @IsDateString()
  startDate?: Date | null;

  @IsOptional()
  @IsDateString()
  deadlineDate?: Date | null;

  @IsOptional()
  @IsDateString()
  maintenanceDate?: Date | null;

  @IsOptional()
  @IsInt()
  projectType?: number | null;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  teams?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  owners?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  managers?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  leaders?: number[];
}
