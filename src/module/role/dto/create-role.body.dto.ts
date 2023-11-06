import { IsInstance, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { CreateRolePolicyBodyDto } from './create-role-policy.body.dto';

export class CreateRoleBodyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsInstance(CreateRolePolicyBodyDto)
  rolePolicy: CreateRolePolicyBodyDto;
}
