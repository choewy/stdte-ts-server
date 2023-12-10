import { IsEnum, IsNotIn, IsOptional } from 'class-validator';

import { RolePolicyLevel, RolePolicyProperty } from '@entity';

export class RolePolicyUpdateBodyDto implements Partial<RolePolicyProperty> {
  @IsOptional()
  @IsNotIn([null])
  @IsEnum(RolePolicyLevel)
  credentials?: RolePolicyLevel;

  @IsOptional()
  @IsNotIn([null])
  @IsEnum(RolePolicyLevel)
  roleAndPolicy?: RolePolicyLevel;

  @IsOptional()
  @IsNotIn([null])
  @IsEnum(RolePolicyLevel)
  setting?: RolePolicyLevel;

  @IsOptional()
  @IsNotIn([null])
  @IsEnum(RolePolicyLevel)
  customer?: RolePolicyLevel;

  @IsOptional()
  @IsNotIn([null])
  @IsEnum(RolePolicyLevel)
  user?: RolePolicyLevel;

  @IsOptional()
  @IsNotIn([null])
  @IsEnum(RolePolicyLevel)
  taskCategory?: RolePolicyLevel;

  @IsOptional()
  @IsNotIn([null])
  @IsEnum(RolePolicyLevel)
  industryCategory?: RolePolicyLevel;

  @IsOptional()
  @IsNotIn([null])
  @IsEnum(RolePolicyLevel)
  businessCategory?: RolePolicyLevel;

  @IsOptional()
  @IsNotIn([null])
  @IsEnum(RolePolicyLevel)
  project?: RolePolicyLevel;
}
