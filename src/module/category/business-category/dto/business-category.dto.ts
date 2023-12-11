import { BusinessCategory } from '@entity';
import { toISOString } from '@server/common';

export class BusinessCategoryDto {
  id: number;
  name: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(businessCategory: BusinessCategory) {
    this.id = businessCategory.id;
    this.name = businessCategory.name;
    this.description = businessCategory.description ?? '';
    this.createdAt = toISOString(businessCategory.createdAt);
    this.updatedAt = toISOString(businessCategory.updatedAt);
  }
}
