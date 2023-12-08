import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PolicyLevel, RolePolicy } from '@entity';

export class CreateRoleBodyDto
  implements
    Partial<Pick<RolePolicy, 'accessCredentials' | 'accessRoleLevel' | 'accessUserLevel' | 'accessProjectLevel'>>
{
  @IsNotEmpty()
  @IsString()
  name: string;

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
}
