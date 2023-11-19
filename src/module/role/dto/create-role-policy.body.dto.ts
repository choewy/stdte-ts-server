import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { RolePolicyScope, getEnumValuesOnlyNumber } from '@server/common';

export class CreateRolePolicyBodyDto {
  @ApiProperty({ type: Number, enum: getEnumValuesOnlyNumber(RolePolicyScope) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessRole: RolePolicyScope;

  @ApiProperty({ type: Number, enum: getEnumValuesOnlyNumber(RolePolicyScope) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessTeam: RolePolicyScope;

  @ApiProperty({ type: Number, enum: getEnumValuesOnlyNumber(RolePolicyScope) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessUser: RolePolicyScope;

  @ApiProperty({ type: Number, enum: getEnumValuesOnlyNumber(RolePolicyScope) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessProject: RolePolicyScope;
}
