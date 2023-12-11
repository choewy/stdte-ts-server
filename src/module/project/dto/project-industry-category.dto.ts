import { IndustryCategory } from '@entity';

export class ProjectIndustryCategoryDto {
  id: number;
  name: string;
  description: string;

  constructor(IndustryCategory: IndustryCategory) {
    this.id = IndustryCategory.id;
    this.name = IndustryCategory.name;
    this.description = IndustryCategory.description ?? '';
  }
}
