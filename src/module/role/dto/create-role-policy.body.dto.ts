import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { RolePolicyScope, toEnumValues } from '@server/common';

export class CreateRolePolicyBodyDto {
  @ApiProperty({ type: Number, enum: toEnumValues(RolePolicyScope, Number) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessRoleValue: RolePolicyScope;

  @ApiProperty({ type: Number, enum: toEnumValues(RolePolicyScope, Number) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessTeamValue: RolePolicyScope;

  @ApiProperty({ type: Number, enum: toEnumValues(RolePolicyScope, Number) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessUserValue: RolePolicyScope;

  @ApiProperty({ type: Number, enum: toEnumValues(RolePolicyScope, Number) })
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScope)
  accessProjectValue: RolePolicyScope;
}
