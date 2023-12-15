import { TaskMainCategory } from '@entity';

import { SelectDto } from './select.dto';

export class SelectTaskCategoryDto extends SelectDto {
  constructor(taskMainCategory: TaskMainCategory) {
    super(taskMainCategory.id, taskMainCategory.name);
  }
}
