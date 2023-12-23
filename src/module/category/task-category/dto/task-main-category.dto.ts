import { TaskMainCategory } from '@entity';
import { toISOString } from '@server/common';

import { TaskSubCategoryDto } from './task-sub-category.dto';

export class TaskMainCategoryDto {
  id: number;
  name: string;
  description: string;
  isReadonly: boolean;
  children: TaskSubCategoryDto[];
  createdAt: string | null;
  updatedAt: string | null;

  constructor(taskMainCategory: TaskMainCategory) {
    this.id = taskMainCategory.id;
    this.name = taskMainCategory.name;
    this.description = taskMainCategory.description ?? '';
    this.isReadonly = taskMainCategory.isReadonly;
    this.children = taskMainCategory.children.map((subCategory) => new TaskSubCategoryDto(subCategory));
    this.createdAt = toISOString(taskMainCategory.createdAt);
    this.updatedAt = toISOString(taskMainCategory.updatedAt);
  }
}
