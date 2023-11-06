import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

import { RolePolicyScopeValue } from '@server/common';

export class CreateRolePolicyBodyDto {
  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessRoleValue: RolePolicyScopeValue;

  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessTeamValue: RolePolicyScopeValue;

  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessUserValue: RolePolicyScopeValue;

  @IsNotEmpty()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessProjectValue: RolePolicyScopeValue;
}
