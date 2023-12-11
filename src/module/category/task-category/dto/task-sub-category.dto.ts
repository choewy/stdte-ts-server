import { TaskSubCategory } from '@entity';
import { toISOString } from '@server/common';

export class TaskSubCategoryDto {
  id: number;
  name: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(taskSubCategory: TaskSubCategory) {
    this.id = taskSubCategory.id;
    this.name = taskSubCategory.name;
    this.description = taskSubCategory.description ?? '';
    this.createdAt = toISOString(taskSubCategory.createdAt);
    this.updatedAt = toISOString(taskSubCategory.updatedAt);
  }
}
