import { TaskMainCategory } from '@entity';
import { toISO } from '@server/common';

import { TaskSubCategoryDto } from './task-sub-category.dto';

export class TaskMainCategoryDto {
  id: number;
  name: string;
  description: string;
  children: TaskSubCategoryDto[];
  createdAt: string | null;
  updatedAt: string | null;

  constructor(taskMainCategory: TaskMainCategory) {
    this.id = taskMainCategory.id;
    this.name = taskMainCategory.name;
    this.description = taskMainCategory.description ?? '';
    this.children = taskMainCategory.children.map((subCategory) => new TaskSubCategoryDto(subCategory));
    this.createdAt = toISO(taskMainCategory.createdAt);
    this.updatedAt = toISO(taskMainCategory.updatedAt);
  }
}
