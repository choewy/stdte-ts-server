import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { ListDto, NotFoundProjectTypeException, ProjectTypeQuery } from '@server/common';

import {
  CreateProjectTypeBodyDto,
  ProjectTypeListQueryDto,
  ProjectTypeParamDto,
  UpdateProjectTypeBodyDto,
} from './dto';

@Injectable()
export class ProjectTypeService {
  constructor(private readonly dataSource: DataSource) {}

  async getProjectTypes(query: ProjectTypeListQueryDto) {
    return new ListDto(
      query,
      await new ProjectTypeQuery(this.dataSource).findProjectTypesAsList(query.skip, query.take),
    );
  }

  async createProjectType(body: CreateProjectTypeBodyDto) {
    await new ProjectTypeQuery(this.dataSource).insertProjectType(body);
  }

  async updateProjectType(param: ProjectTypeParamDto, body: UpdateProjectTypeBodyDto) {
    const projectTypeQuery = new ProjectTypeQuery(this.dataSource);

    const has = await projectTypeQuery.hasProjectTypeById(param.id);

    if (has === false) {
      throw new NotFoundProjectTypeException();
    }

    await projectTypeQuery.updateProjectType(param.id, body);
  }

  async deleteProjectType(param: ProjectTypeParamDto) {
    const projectTypeQuery = new ProjectTypeQuery(this.dataSource);

    const has = await projectTypeQuery.hasProjectTypeById(param.id);

    if (has === false) {
      throw new NotFoundProjectTypeException();
    }

    await projectTypeQuery.deleteProjectType(param.id);
  }
}
