import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PolicyLevel, RolePolicy } from '@entity';

export class UpdateRoleBodyDto
  implements
    Partial<Pick<RolePolicy, 'accessCredentials' | 'accessRoleLevel' | 'accessUserLevel' | 'accessProjectLevel'>>
{
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessCredentials?: PolicyLevel;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessRoleLevel?: PolicyLevel;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessUserLevel?: PolicyLevel;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessProjectLevel?: PolicyLevel;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  users?: number[];
}
