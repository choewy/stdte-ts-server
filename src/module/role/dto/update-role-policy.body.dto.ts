import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { RolePolicyScopeValue } from '@server/common';

export class UpdateRolePolicyBodyDto {
  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessRoleValue?: RolePolicyScopeValue;

  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessTeamValue?: RolePolicyScopeValue;

  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessUserValue?: RolePolicyScopeValue;

  @IsOptional()
  @IsInt()
  @IsEnum(RolePolicyScopeValue)
  accessProjectValue?: RolePolicyScopeValue;
}
