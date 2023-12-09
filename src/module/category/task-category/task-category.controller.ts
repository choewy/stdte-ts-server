import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { TaskCategoryService } from './task-category.service';
import {
  TaskCategoryParamDto,
  TaskMainCategoryCreateBodyDto,
  TaskMainCategoryUpdateBodyDto,
  TaskSubCategoryCreateBodyDto,
  TaskSubCategoryUpdateBodyDto,
} from './dto';

@Controller('category/task')
export class TaskCategoryController {
  constructor(private taskCategoryService: TaskCategoryService) {}

  @Get('main')
  async getTaskMainCategories() {
    return this.taskCategoryService.getTaskMainCategories();
  }

  @Get('main/:id(\\d+)')
  async getTaskMainCategory(@Param() param: TaskCategoryParamDto) {
    return this.taskCategoryService.getTaskMainCategory(param);
  }

  @Post('main')
  async createTaskMainCategory(@Body() body: TaskMainCategoryCreateBodyDto) {
    return this.taskCategoryService.createTaskMainCategory(body);
  }

  @Patch('main/:id(\\d+)')
  async updateTaskMainCategory(@Param() param: TaskCategoryParamDto, @Body() body: TaskMainCategoryUpdateBodyDto) {
    return this.taskCategoryService.updateTaskMainCategory(param, body);
  }

  @Delete('main/:id(\\d+)')
  async deleteTaskMainCategory(@Param() param: TaskCategoryParamDto) {
    return this.taskCategoryService.deleteTaskMainCategory(param);
  }

  @Post('sub')
  async createTaskSubCategory(@Body() body: TaskSubCategoryCreateBodyDto) {
    return this.taskCategoryService.createTaskSubCategory(body);
  }

  @Patch('sub/:id(\\d+)')
  async updateTaskSubCategory(@Param() param: TaskCategoryParamDto, @Body() body: TaskSubCategoryUpdateBodyDto) {
    return this.taskCategoryService.updateTaskSubCategory(param, body);
  }

  @Delete('sub/:id(\\d+)')
  async deleteTaskSubCategory(@Param() param: TaskCategoryParamDto) {
    return this.taskCategoryService.deleteTaskSubCategory(param);
  }
}
