import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

import { AppendOrRemove, AppendOrRemoveArgs } from '@server/common';

export class RoleUserBodyDto implements AppendOrRemoveArgs {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsEnum(AppendOrRemove)
  action: AppendOrRemove;
}
