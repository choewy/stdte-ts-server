import { Injectable } from '@nestjs/common';
import {
  IndustryCategoryCreateBodyDto,
  IndustryCategoryListQueryDto,
  IndustryCategoryParamDto,
  IndustryCategoryUpdateBodyDto,
} from './dto';

@Injectable()
export class IndustryCategoryService {
  async getIndustryCategories(query: IndustryCategoryListQueryDto) {
    return;
  }

  async getIndustryCategory(param: IndustryCategoryParamDto) {
    return;
  }

  async createIndustryCategory(param: IndustryCategoryCreateBodyDto) {
    return;
  }

  async updateIndustryCategory(param: IndustryCategoryParamDto, body: IndustryCategoryUpdateBodyDto) {
    return;
  }

  async deleteIndustryCategory(param: IndustryCategoryParamDto) {
    return;
  }
}
