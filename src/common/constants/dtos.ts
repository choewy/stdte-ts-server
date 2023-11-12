import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';

import {
  AuthStatusText,
  AuthStatusValue,
  DegreeText,
  DegreeValue,
  EmploymentStatusText,
  EmploymentStatusValue,
  ProjectScopeText,
  ProjectScopeValue,
  ProjectStatusText,
  ProjectStatusValue,
  RolePolicyScopeText,
  RolePolicyScopeValue,
} from './enums';
import {
  MapResponseType,
  toAuthStatusText,
  toDegreeText,
  toEmploymentStatusText,
  toProjectScopeText,
  toProjectStatusText,
  toRolePolicyText,
} from './helpers';
import { Type } from 'class-transformer';

export class ExceptionResponseDetailsDto {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;

  constructor(details?: unknown) {
    if (details instanceof Error) {
      this.name = details.name;
      this.message = details.message;
    }
  }
}

export class ExceptionResponseDto {
  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: Number, enum: HttpStatus })
  statusCode: HttpStatus;

  @ApiResponseProperty({ type: String })
  error: string;

  @ApiResponseProperty({ type: ExceptionResponseDetailsDto })
  details: ExceptionResponseDetailsDto;

  constructor(exception: HttpException) {
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'object') {
      Object.assign(this, exception.getResponse());
    }
  }
}

export class ListQueryDto {
  @ApiPropertyOptional({ type: Number, example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  skip: number;

  @ApiPropertyOptional({ type: Number, example: 20 })
  @IsOptional()
  @IsInt()
  @Max(100)
  @Type(() => Number)
  take: number;

  constructor() {
    this.skip = 0;
    this.take = 20;
  }
}

export class DegreeMapResponseDto extends MapResponseType(DegreeValue, DegreeText, toDegreeText as any) {}

export class AuthStatusMapResponseDto extends MapResponseType(
  AuthStatusValue,
  AuthStatusText,
  toAuthStatusText as any,
) {}

export class EmploymentStatusMapResponseDto extends MapResponseType(
  EmploymentStatusValue,
  EmploymentStatusText,
  toEmploymentStatusText as any,
) {}

export class ProjectScopeMapResponseDto extends MapResponseType(
  ProjectScopeValue,
  ProjectScopeText,
  toProjectScopeText as any,
) {}

export class ProjectStatusMapResponseDto extends MapResponseType(
  ProjectStatusValue,
  ProjectStatusText,
  toProjectStatusText as any,
) {}

export class RolePolicyScopeMapResponseDto extends MapResponseType(
  RolePolicyScopeValue,
  RolePolicyScopeText,
  toRolePolicyText as any,
) {}
