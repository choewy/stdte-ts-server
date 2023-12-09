import { IsInstance, IsNotEmpty, IsNotIn, IsString, MinLength } from 'class-validator';

import { RolePolicyCreateBodyDto } from './role-policy-create.body.dto';

export class RoleCreateBodyDto {
  @IsNotEmpty()
  @IsNotIn([null])
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsNotIn([null])
  @IsInstance(RolePolicyCreateBodyDto)
  rolePolicy: RolePolicyCreateBodyDto;
}
