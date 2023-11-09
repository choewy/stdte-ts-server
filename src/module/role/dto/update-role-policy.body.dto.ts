import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RolePolicyScopeValue, toEnumValues } from '@server/common';

export class UpdateRolePolicyBodyDto {
  @ApiPropertyOptional({ type: Number, enum: toEnumValues(RolePolicyScopeValue, Number) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessRoleValue?: RolePolicyScopeValue;

  @ApiPropertyOptional({ type: Number, enum: toEnumValues(RolePolicyScopeValue, Number) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessTeamValue?: RolePolicyScopeValue;

  @ApiPropertyOptional({ type: Number, enum: toEnumValues(RolePolicyScopeValue, Number) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessUserValue?: RolePolicyScopeValue;

  @ApiPropertyOptional({ type: Number, enum: toEnumValues(RolePolicyScopeValue, Number) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessProjectValue?: RolePolicyScopeValue;
}
