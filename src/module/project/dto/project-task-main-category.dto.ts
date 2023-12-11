import { TaskMainCategory } from '@entity';

export class ProjectTaskMainCategoryDto {
  id: number;
  name: string;
  description: string;

  constructor(taskMainCategory: TaskMainCategory) {
    this.id = taskMainCategory.id;
    this.name = taskMainCategory.name;
    this.description = taskMainCategory.description ?? '';
  }
}
