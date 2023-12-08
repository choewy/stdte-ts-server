import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PolicyLevel, RolePolicy } from '@entity';

export class CreateRoleBodyDto
  implements Partial<Pick<RolePolicy, 'accessCredentials' | 'accessRole' | 'accessUser' | 'accessProject'>>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessCredentials?: PolicyLevel;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessRole?: PolicyLevel;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessUser?: PolicyLevel;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessProject?: PolicyLevel;
}
