import { TaskSubCategory } from '@entity';

export class TimeRecordTaskSubCategoryDto {
  id: number;

  constructor(taskSubCategory: TaskSubCategory | null) {
    this.id = taskSubCategory ? taskSubCategory.id : 0;
  }
}
