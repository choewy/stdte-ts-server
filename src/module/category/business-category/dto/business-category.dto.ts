import { BusinessCategory } from '@entity';
import { toISO } from '@server/common';

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
    this.createdAt = toISO(businessCategory.createdAt);
    this.updatedAt = toISO(businessCategory.updatedAt);
  }
}
