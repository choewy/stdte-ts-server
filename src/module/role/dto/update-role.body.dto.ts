import { IsInstance, IsOptional, IsString, MinLength } from 'class-validator';

import { UpdateRolePolicyBodyDto } from './update-role-policy.body.dto';

export class UpdateRoleBodyDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsInstance(UpdateRolePolicyBodyDto)
  rolePolicy?: UpdateRolePolicyBodyDto;
}
