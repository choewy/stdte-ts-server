import { TaskSubCategory } from '@entity';

export class TimeProjectTaskSubCategoryDto {
  id: number;
  name: string;

  constructor(taskSubCategory: TaskSubCategory) {
    this.id = taskSubCategory.id;
    this.name = taskSubCategory.name;
  }
}
