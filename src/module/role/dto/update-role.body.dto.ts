import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PolicyLevel, RolePolicy } from '@entity';

export class UpdateRoleBodyDto
  implements
    Partial<Pick<RolePolicy, 'accessRoleLevel' | 'accessTeamLevel' | 'accessUserLevel' | 'accessProjectLevel'>>
{
  @IsOptional()
  @IsString()
  name?: string;

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
