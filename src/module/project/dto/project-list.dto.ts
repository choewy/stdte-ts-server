import { ListDto } from '@server/common';

import { Project } from '@entity';

import { ProjectDto } from './project.dto';
import { ProjectListQueryDto } from './project-list.query.dto';

export class ProjectListDto extends ListDto<Project, ProjectListQueryDto, ProjectDto> {
  amounts: string;

  constructor(query: ProjectListQueryDto, list: [Project[], number], dto: typeof ProjectDto, amounts?: string) {
    super(query, list, dto);

    this.amounts = amounts ?? '0';
  }
}
