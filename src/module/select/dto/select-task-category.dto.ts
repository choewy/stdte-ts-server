import { TaskMainCategory } from '@entity';

import { SelectDto } from './select.dto';

export class SelectTaskCategoryDto extends SelectDto {
  isDefault: boolean;

  constructor(taskMainCategory: TaskMainCategory) {
    super(taskMainCategory.id, taskMainCategory.name);

    this.isDefault = taskMainCategory.isDefault;
  }
}
