import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RolePolicyScope, getEnumValuesOnlyNumber } from '@server/common';

export class UpdateRolePolicyBodyDto {
  @ApiPropertyOptional({ type: Number, enum: getEnumValuesOnlyNumber(RolePolicyScope) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessRole?: RolePolicyScope;

  @ApiPropertyOptional({ type: Number, enum: getEnumValuesOnlyNumber(RolePolicyScope) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessTeam?: RolePolicyScope;

  @ApiPropertyOptional({ type: Number, enum: getEnumValuesOnlyNumber(RolePolicyScope) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessUser?: RolePolicyScope;

  @ApiPropertyOptional({ type: Number, enum: getEnumValuesOnlyNumber(RolePolicyScope) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessProject?: RolePolicyScope;
}
