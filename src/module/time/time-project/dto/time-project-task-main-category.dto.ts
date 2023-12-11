import { TaskMainCategory } from '@entity';

import { TimeProjectTaskSubCategoryDto } from './time-project-task-sub-category.dto';

export class TimeProjectTaskMainCategoryDto {
  id: number;
  name: string;
  children: TimeProjectTaskSubCategoryDto[];

  constructor(taskMainCategory: TaskMainCategory) {
    this.id = taskMainCategory.id;
    this.name = taskMainCategory.name;
    this.children = taskMainCategory.children.map((child) => new TimeProjectTaskSubCategoryDto(child));
  }
}
