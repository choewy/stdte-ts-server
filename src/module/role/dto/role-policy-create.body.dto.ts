import { IsEnum, IsNotEmpty } from 'class-validator';

import { RolePolicyLevel, RolePolicyProperty } from '@entity';

export class RolePolicyCreateBodyDto implements RolePolicyProperty {
  @IsNotEmpty()
  @IsEnum(RolePolicyLevel)
  credentials: RolePolicyLevel;

  @IsNotEmpty()
  @IsEnum(RolePolicyLevel)
  roleAndPolicy: RolePolicyLevel;

  @IsNotEmpty()
  @IsEnum(RolePolicyLevel)
  setting: RolePolicyLevel;

  @IsNotEmpty()
  @IsEnum(RolePolicyLevel)
  customer: RolePolicyLevel;

  @IsNotEmpty()
  @IsEnum(RolePolicyLevel)
  user: RolePolicyLevel;

  @IsNotEmpty()
  @IsEnum(RolePolicyLevel)
  taskCategory: RolePolicyLevel;

  @IsNotEmpty()
  @IsEnum(RolePolicyLevel)
  industryCategory: RolePolicyLevel;

  @IsNotEmpty()
  @IsEnum(RolePolicyLevel)
  businessCategory: RolePolicyLevel;

  @IsNotEmpty()
  @IsEnum(RolePolicyLevel)
  project: RolePolicyLevel;
}
