import { BusinessCategory } from '@entity';

import { SelectDto } from './select.dto';

export class SelectBusinessCategoryDto extends SelectDto {
  constructor(businessCategory: BusinessCategory) {
    super(businessCategory.id, businessCategory.name);
  }
}
