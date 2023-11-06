import { IsArray, IsInstance, IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

import { CreateRolePolicyBodyDto } from './create-role-policy.body.dto';

export class CreateRoleBodyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsInstance(CreateRolePolicyBodyDto)
  rolePolicy: CreateRolePolicyBodyDto;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  users: number[];
}
