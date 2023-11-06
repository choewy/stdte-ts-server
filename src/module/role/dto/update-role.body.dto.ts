import { IsArray, IsInstance, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

import { UpdateRolePolicyBodyDto } from './update-role-policy.body.dto';

export class UpdateRoleBodyDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsInstance(UpdateRolePolicyBodyDto)
  rolePolicy?: UpdateRolePolicyBodyDto;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  users?: number[];
}
