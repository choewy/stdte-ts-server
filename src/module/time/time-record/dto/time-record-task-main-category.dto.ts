import { TaskMainCategory } from '@entity';

export class TImeRecordTaskMainCategoryDto {
  id: number;

  constructor(taskMainCategory: TaskMainCategory | null) {
    this.id = taskMainCategory ? taskMainCategory.id : 0;
  }
}
