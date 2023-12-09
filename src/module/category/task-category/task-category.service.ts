import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  TaskCategoryParamDto,
  TaskMainCategoryCreateBodyDto,
  TaskMainCategoryUpdateBodyDto,
  TaskSubCategoryCreateBodyDto,
  TaskSubCategoryUpdateBodyDto,
} from './dto';

@Injectable()
export class TaskCategoryService {
  constructor(private readonly dataSource: DataSource) {}

  async getTaskMainCategories() {
    return;
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
