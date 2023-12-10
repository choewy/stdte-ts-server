import { TaskSubCategory } from '@entity';
import { toISO } from '@server/common';

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
    this.createdAt = toISO(taskSubCategory.createdAt);
    this.updatedAt = toISO(taskSubCategory.updatedAt);
  }
}
