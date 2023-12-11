import { Project, TaskMainCategory } from '@entity';

import { TimeProjectTaskMainCategoryDto } from './time-project-task-main-category.dto';

export class TimeProjectDto {
  id: number;
  name: string;
  code: string;
  taskMainCategory: TimeProjectTaskMainCategoryDto;

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.code = project.code;
    this.taskMainCategory = new TimeProjectTaskMainCategoryDto(project.taskMainCategory as TaskMainCategory);
  }
}
