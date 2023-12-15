import { Transform } from 'class-transformer';
import { IsArray, IsInstance, IsNotIn, IsOptional, IsString, MinLength } from 'class-validator';

import { User } from '@entity';
import { toEntities, toTrim } from '@server/common';

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

  @IsOptional()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  users?: User[];
}
