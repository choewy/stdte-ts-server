import { IndustryCategory } from '@entity';
import { toISO } from '@server/common';

export class IndustryCategoryDto {
  id: number;
  name: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(IndustryCategory: IndustryCategory) {
    this.id = IndustryCategory.id;
    this.name = IndustryCategory.name;
    this.description = IndustryCategory.description ?? '';
    this.createdAt = toISO(IndustryCategory.createdAt);
    this.updatedAt = toISO(IndustryCategory.updatedAt);
  }
}
