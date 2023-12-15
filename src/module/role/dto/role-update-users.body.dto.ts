import { Transform } from 'class-transformer';
import { IsArray, IsInstance, IsOptional } from 'class-validator';

import { User } from '@entity';
import { toEntities } from '@server/common';

export class RoleUpdateUsersBodyDto {
  @IsOptional()
  @IsArray()
  @IsInstance(User, { each: true })
  @Transform(({ value }) => toEntities(User, value))
  users: User[];
}
