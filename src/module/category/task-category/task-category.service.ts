import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  AlreadyExistTaskMainCategoryException,
  ListDto,
  NotFoundTaskMainCategoryException,
  NotFoundTaskSubCategoryException,
  TaskMainCategoryQuery,
  TaskSubCategoryQuery,
} from '@server/common';

import {
  TaskCategoryListQueryDto,
  TaskCategoryParamDto,
  TaskMainCategoryCreateBodyDto,
  TaskMainCategoryDto,
  TaskMainCategoryUpdateBodyDto,
  TaskSubCategoryCreateBodyDto,
  TaskSubCategoryDto,
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
    const taskMainCategoryQuery = new TaskMainCategoryQuery(this.dataSource);
    const taskMainCategory = await taskMainCategoryQuery.findTaskMainCategoryById(param.id, {
      children: true,
    });

    if (taskMainCategory == null) {
      throw new NotFoundTaskMainCategoryException();
    }

    return new TaskMainCategoryDto(taskMainCategory);
  }

  async createTaskMainCategory(body: TaskMainCategoryCreateBodyDto) {
    const taskMainCategoryQuery = new TaskMainCategoryQuery(this.dataSource);
    const hasTaskMainCategory = await taskMainCategoryQuery.hasTaskMainCategoryByName(body.name);

    if (hasTaskMainCategory) {
      throw new AlreadyExistTaskMainCategoryException();
    }

    const insert = await taskMainCategoryQuery.insertTaskMainCategory(body);
    const taskMainCategoryId = insert.identifiers[0]?.id;

    if (taskMainCategoryId == null) {
      throw new NotFoundTaskMainCategoryException();
    }

    const taskMainCategory = await taskMainCategoryQuery.findTaskMainCategoryById(taskMainCategoryId, {
      children: true,
    });

    if (taskMainCategory == null) {
      throw new NotFoundTaskMainCategoryException();
    }

    return new TaskMainCategoryDto(taskMainCategory);
  }

  async updateTaskMainCategory(param: TaskCategoryParamDto, body: TaskMainCategoryUpdateBodyDto) {
    const taskMainCategoryQuery = new TaskMainCategoryQuery(this.dataSource);
    const hasTaskMainCategory = await taskMainCategoryQuery.hasTaskMainCategoryById(param.id);

    if (hasTaskMainCategory === false) {
      throw new NotFoundTaskMainCategoryException();
    }

    if (body.name) {
      if (await taskMainCategoryQuery.hasTaskMainCategoryByNameOmitId(param.id, body.name)) {
        throw new AlreadyExistTaskMainCategoryException();
      }
    }

    await taskMainCategoryQuery.updateTaskMainCategory(param.id, body);
    const taskMainCategory = await taskMainCategoryQuery.findTaskMainCategoryById(param.id, {
      children: true,
    });

    if (taskMainCategory == null) {
      throw new NotFoundTaskMainCategoryException();
    }

    return new TaskMainCategoryDto(taskMainCategory);
  }

  async deleteTaskMainCategory(param: TaskCategoryParamDto) {
    const taskMainCategoryQuery = new TaskMainCategoryQuery(this.dataSource);
    const hasTaskMainCategory = await taskMainCategoryQuery.hasTaskMainCategoryById(param.id);

    if (hasTaskMainCategory === false) {
      throw new NotFoundTaskMainCategoryException();
    }

    await taskMainCategoryQuery.deleteTaskMainCategory(param.id);
  }

  async createTaskSubCategory(body: TaskSubCategoryCreateBodyDto) {
    const taskMainCategoryQuery = new TaskMainCategoryQuery(this.dataSource);
    const hasTaskMainCategory = await taskMainCategoryQuery.hasTaskMainCategoryById(body.parent.id);

    if (hasTaskMainCategory === false) {
      throw new NotFoundTaskMainCategoryException();
    }

    const taskSubCategoryQuery = new TaskSubCategoryQuery(this.dataSource);
    const insert = await taskSubCategoryQuery.insertTaskSubCategory(body);
    const taskSubCategoryId = insert.identifiers[0]?.id;

    if (taskSubCategoryId == null) {
      throw new NotFoundTaskSubCategoryException();
    }

    const taskSubCategory = await taskSubCategoryQuery.findTaskSubCategoryById(taskSubCategoryId);

    if (taskSubCategory == null) {
      throw new NotFoundTaskSubCategoryException();
    }

    return new TaskSubCategoryDto(taskSubCategory);
  }

  async updateTaskSubCategory(param: TaskCategoryParamDto, body: TaskSubCategoryUpdateBodyDto) {
    const taskSubCategoryQuery = new TaskSubCategoryQuery(this.dataSource);
    const hasTaskSubCategory = await taskSubCategoryQuery.hasTaskSubCategoryById(param.id);

    if (hasTaskSubCategory === false) {
      throw new NotFoundTaskSubCategoryException();
    }

    await taskSubCategoryQuery.updateTaskSubCategory(param.id, body);
    const taskSubCategory = await taskSubCategoryQuery.findTaskSubCategoryById(param.id);

    if (taskSubCategory == null) {
      throw new NotFoundTaskSubCategoryException();
    }

    return new TaskSubCategoryDto(taskSubCategory);
  }

  async deleteTaskSubCategory(param: TaskCategoryParamDto) {
    const taskSubCategoryQuery = new TaskSubCategoryQuery(this.dataSource);
    const hasTaskSubCategory = await taskSubCategoryQuery.hasTaskSubCategoryById(param.id);

    if (hasTaskSubCategory === false) {
      throw new NotFoundTaskSubCategoryException();
    }

    await taskSubCategoryQuery.deleteTaskSubCategory(param.id);
  }
}
