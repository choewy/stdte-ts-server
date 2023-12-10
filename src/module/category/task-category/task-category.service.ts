import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { ListDto, TaskMainCategoryQuery } from '@server/common';

import {
  TaskCategoryListQueryDto,
  TaskCategoryParamDto,
  TaskMainCategoryCreateBodyDto,
  TaskMainCategoryDto,
  TaskMainCategoryUpdateBodyDto,
  TaskSubCategoryCreateBodyDto,
  TaskSubCategoryUpdateBodyDto,
} from './dto';

@Injectable()
export class TaskCategoryService {
  constructor(private readonly dataSource: DataSource) {}

  async getTaskMainCategories(query: TaskCategoryListQueryDto) {
    const taskMainCategoryQuery = new TaskMainCategoryQuery(this.dataSource);

    return new ListDto(query, await taskMainCategoryQuery.findTaskMainCategoryList(query), TaskMainCategoryDto);
  }

  async getTaskMainCategory(param: TaskCategoryParamDto) {
    return;
  }

  async createTaskMainCategory(body: TaskMainCategoryCreateBodyDto) {
    return;
  }

  async updateTaskMainCategory(param: TaskCategoryParamDto, body: TaskMainCategoryUpdateBodyDto) {
    return;
  }

  async deleteTaskMainCategory(param: TaskCategoryParamDto) {
    return;
  }

  async createTaskSubCategory(body: TaskSubCategoryCreateBodyDto) {
    return;
  }

  async updateTaskSubCategory(param: TaskCategoryParamDto, body: TaskSubCategoryUpdateBodyDto) {
    return;
  }

  async deleteTaskSubCategory(param: TaskCategoryParamDto) {
    return;
  }
}
