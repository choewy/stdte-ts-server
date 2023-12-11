import { BusinessCategory } from '@entity';

export class ProjectBusinessCategoryDto {
  id: number;
  name: string;
  description: string;

  constructor(businessCategory: BusinessCategory) {
    this.id = businessCategory.id;
    this.name = businessCategory.name;
    this.description = businessCategory.description ?? '';
  }
}
