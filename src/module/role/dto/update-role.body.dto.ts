import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PolicyLevel, RolePolicy } from '@entity';

export class UpdateRoleBodyDto
  implements Partial<Pick<RolePolicy, 'accessCredentials' | 'accessRole' | 'accessUser' | 'accessProject'>>
{
  @IsOptional()
  @IsString()
  name?: string;

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

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  users?: number[];
}
