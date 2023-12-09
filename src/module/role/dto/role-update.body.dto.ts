import { IsInstance, IsNotIn, IsOptional, IsString, MinLength } from 'class-validator';
import { RolePolicyUpdateBodyDto } from './role-policy-update.body.dto';

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
}
