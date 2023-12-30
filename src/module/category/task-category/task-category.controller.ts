import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { TaskCategoryService } from './task-category.service';
import {
  TaskCategoryListQueryDto,
  TaskCategoryParamDto,
  TaskMainCategoryCreateBodyDto,
  TaskMainCategoryUpdateBodyDto,
  TaskSubCategoryCreateBodyDto,
  TaskSubCategoryUpdateBodyDto,
} from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('category/task')
export class TaskCategoryController {
  constructor(private taskCategoryService: TaskCategoryService) {}

  @Get()
  @SetRolePolicy({ taskCategory: RolePolicyLevel.Read })
  async getTaskMainCategories(@Query() query: TaskCategoryListQueryDto) {
    return this.taskCategoryService.getTaskMainCategories(query);
  }

  @Get('download')
  @SetRolePolicy({ taskCategory: RolePolicyLevel.Read })
  async createTaskCategoriesFile() {
    return this.taskCategoryService.createTaskCategoriesFile();
  }

  @Post()
  @SetRolePolicy({ taskCategory: RolePolicyLevel.Create })
  async createTaskMainCategory(@Body() body: TaskMainCategoryCreateBodyDto) {
    return this.taskCategoryService.createTaskMainCategory(body);
  }

  @Patch(':id(\\d+)')
  @SetRolePolicy({ taskCategory: RolePolicyLevel.Update })
  async updateTaskMainCategory(@Param() param: TaskCategoryParamDto, @Body() body: TaskMainCategoryUpdateBodyDto) {
    return this.taskCategoryService.updateTaskMainCategory(param, body);
  }

  @Delete(':id(\\d+)')
  @SetRolePolicy({ taskCategory: RolePolicyLevel.Delete })
  async deleteTaskMainCategory(@Param() param: TaskCategoryParamDto) {
    return this.taskCategoryService.deleteTaskMainCategory(param);
  }

  @Post('child')
  @SetRolePolicy({ taskCategory: RolePolicyLevel.Create })
  async createTaskSubCategory(@Body() body: TaskSubCategoryCreateBodyDto) {
    return this.taskCategoryService.createTaskSubCategory(body);
  }

  @Patch('child/:id(\\d+)')
  @SetRolePolicy({ taskCategory: RolePolicyLevel.Update })
  async updateTaskSubCategory(@Param() param: TaskCategoryParamDto, @Body() body: TaskSubCategoryUpdateBodyDto) {
    return this.taskCategoryService.updateTaskSubCategory(param, body);
  }

  @Delete('child/:id(\\d+)')
  @SetRolePolicy({ taskCategory: RolePolicyLevel.Delete })
  async deleteTaskSubCategory(@Param() param: TaskCategoryParamDto) {
    return this.taskCategoryService.deleteTaskSubCategory(param);
  }
}
