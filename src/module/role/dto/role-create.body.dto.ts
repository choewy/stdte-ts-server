import { Transform } from 'class-transformer';
import { IsInstance, IsNotEmpty, IsNotIn, IsString, MinLength } from 'class-validator';

import { toTrim } from '@server/common';

import { RolePolicyCreateBodyDto } from './role-policy-create.body.dto';

export class RoleCreateBodyDto {
  @IsNotEmpty()
  @IsNotIn([null])
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => toTrim(value))
  name: string;

  @IsNotEmpty()
  @IsNotIn([null])
  @IsInstance(RolePolicyCreateBodyDto)
  rolePolicy: RolePolicyCreateBodyDto;
}
