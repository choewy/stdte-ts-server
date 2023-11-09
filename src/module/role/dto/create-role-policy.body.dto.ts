import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { RolePolicyScopeValue, toEnumValues } from '@server/common';

export class CreateRolePolicyBodyDto {
  @ApiProperty({ type: Number, enum: toEnumValues(RolePolicyScopeValue, Number) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessRoleValue: RolePolicyScopeValue;

  @ApiProperty({ type: Number, enum: toEnumValues(RolePolicyScopeValue, Number) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessTeamValue: RolePolicyScopeValue;

  @ApiProperty({ type: Number, enum: toEnumValues(RolePolicyScopeValue, Number) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessUserValue: RolePolicyScopeValue;

  @ApiProperty({ type: Number, enum: toEnumValues(RolePolicyScopeValue, Number) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessProjectValue: RolePolicyScopeValue;
}
