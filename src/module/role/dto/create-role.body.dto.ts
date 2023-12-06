import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PolicyLevel, RolePolicy } from '@entity';

export class CreateRoleBodyDto
  implements
    Partial<Pick<RolePolicy, 'accessRoleLevel' | 'accessTeamLevel' | 'accessUserLevel' | 'accessProjectLevel'>>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessRoleLevel?: PolicyLevel;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessTeamLevel?: PolicyLevel;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessUserLevel?: PolicyLevel;

  @IsOptional()
  @IsEnum(PolicyLevel)
  accessProjectLevel?: PolicyLevel;
}
