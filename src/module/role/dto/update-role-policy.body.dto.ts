import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RolePolicyScope, toEnumValues } from '@server/common';

export class UpdateRolePolicyBodyDto {
  @ApiPropertyOptional({ type: Number, enum: toEnumValues(RolePolicyScope, Number) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessRoleValue?: RolePolicyScope;

  @ApiPropertyOptional({ type: Number, enum: toEnumValues(RolePolicyScope, Number) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessTeamValue?: RolePolicyScope;

  @ApiPropertyOptional({ type: Number, enum: toEnumValues(RolePolicyScope, Number) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessUserValue?: RolePolicyScope;

  @ApiPropertyOptional({ type: Number, enum: toEnumValues(RolePolicyScope, Number) })
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessProjectValue?: RolePolicyScope;
}
