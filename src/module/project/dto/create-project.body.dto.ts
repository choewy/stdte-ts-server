import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { ProjectStatus } from '@entity';

export class CreateProjectBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsOptional()
  @IsString()
  orderer: string | null;

  @IsOptional()
  @IsString()
  summary: string | null;

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
  income: bigint | null;

  @IsOptional()
  @IsDateString()
  startDate: Date | null;

  @IsOptional()
  @IsDateString()
  deadlineDate: Date | null;

  @IsOptional()
  @IsDateString()
  maintenanceDate: Date | null;

  @IsOptional()
  @IsInt()
  projectType: number | null;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  owners: number[];

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  managers: number[];

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  leaders: number[];
}
