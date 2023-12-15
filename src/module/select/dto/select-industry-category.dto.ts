import { IndustryCategory } from '@entity';

import { SelectDto } from './select.dto';

export class SelectIndustryCategoryDto extends SelectDto {
  constructor(industryCategory: IndustryCategory) {
    super(industryCategory.id, industryCategory.name);
  }
}
