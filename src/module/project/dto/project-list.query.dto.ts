import { ListQueryDto, ProjectQueryFindListArgs } from '@server/common';

import { ProjectStatus } from '@entity';

export class ProjectListQueryDto extends ListQueryDto implements ProjectQueryFindListArgs {
  businessCategory?: number;
  industryCategory?: number;
  taskMainCategory?: number;
  customer?: number;
  status?: ProjectStatus;
}
