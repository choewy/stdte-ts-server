import { Transform } from 'class-transformer';
import { IsInstance, IsNotIn, IsOptional, IsString, MinLength } from 'class-validator';

import { toTrim } from '@server/common';

import { RolePolicyUpdateBodyDto } from './role-policy-update.body.dto';

export class RoleUpdateBodyDto {
  @IsOptional()
  @IsNotIn([null])
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => toTrim(value))
  name?: string;

  @IsOptional()
  @IsNotIn([null])
  @IsInstance(RolePolicyUpdateBodyDto)
  rolePolicy?: RolePolicyUpdateBodyDto;
}
