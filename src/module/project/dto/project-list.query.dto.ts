import { Transform } from 'class-transformer';

import { ProjectStatus } from '@entity';
import { ListQueryDto, ProjectQueryFindListArgs, toBoolean } from '@server/common';

export class ProjectListQueryDto extends ListQueryDto implements ProjectQueryFindListArgs {
  @Transform(({ value }) => Number(value))
  businessCategory?: number;

  @Transform(({ value }) => Number(value))
  industryCategory?: number;

  @Transform(({ obj, key }) => toBoolean(obj[key]))
  canExpose?: boolean;

  @Transform(({ value }) => Number(value))
  customer?: number;

  @Transform(({ value }) => Number(value))
  status?: ProjectStatus;
}
