import { Transform } from 'class-transformer';
import { IsArray, IsInstance, IsNotEmpty, IsNotIn, IsOptional, IsString, MinLength } from 'class-validator';

import { toTrim } from '@server/common';

import { RolePolicyCreateBodyDto } from './role-policy-create.body.dto';
import { RoleUserBodyDto } from './role-user.body.dto';

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

  @IsOptional()
  @IsArray()
  @IsInstance(RoleUserBodyDto, { each: true })
  users?: RoleUserBodyDto[];
}
