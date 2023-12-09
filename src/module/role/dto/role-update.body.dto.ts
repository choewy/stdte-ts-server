import { IsArray, IsInstance, IsNotIn, IsOptional, IsString, MinLength } from 'class-validator';

import { RolePolicyUpdateBodyDto } from './role-policy-update.body.dto';
import { RoleUserBodyDto } from './role-user.body.dto';

export class RoleUpdateBodyDto {
  @IsOptional()
  @IsNotIn([null])
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsNotIn([null])
  @IsInstance(RolePolicyUpdateBodyDto)
  rolePolicy?: RolePolicyUpdateBodyDto;

  @IsOptional()
  @IsArray()
  @IsInstance(RoleUserBodyDto, { each: true })
  users?: RoleUserBodyDto[];
}
