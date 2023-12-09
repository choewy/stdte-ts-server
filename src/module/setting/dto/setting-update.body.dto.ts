import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { toEmptyNull } from '@server/common';

export class SettingUpdateBodyDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => toEmptyNull(value))
  difficultyTooltip: string | null;
}
