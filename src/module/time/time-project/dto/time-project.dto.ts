import { Project } from '@entity';

import { TimeProjectTaskMainCategoryDto } from './time-project-task-main-category.dto';

export class TimeProjectDto {
  id: number;
  name: string;
  code: string;
  category: TimeProjectTaskMainCategoryDto | null;

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.code = project.code;

    this.category = project.taskMainCategory ? new TimeProjectTaskMainCategoryDto(project.taskMainCategory) : null;
  }
}
