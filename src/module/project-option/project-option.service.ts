import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { NotFoundProjectOptionException, ProjectOptionQuery, ResponseDto } from '@server/common';

import { CreateProjectOptionBodyDto, ProjectOptionParamDto, UpdateProjectOptionBodyDto } from './dto';

@Injectable()
export class ProjectOptionService {
  constructor(private readonly dataSource: DataSource) {}

  async createProjectOption(body: CreateProjectOptionBodyDto) {
    await new ProjectOptionQuery(this.dataSource).insertProjectOption(body);

    return new ResponseDto();
  }

  async updateProjectOption(param: ProjectOptionParamDto, body: UpdateProjectOptionBodyDto) {
    const projectOptionQuery = new ProjectOptionQuery(this.dataSource);
    const has = await projectOptionQuery.hasProjectOptionById(param.id);

    if (has === false) {
      throw new NotFoundProjectOptionException();
    }

    await projectOptionQuery.updateProjectOption(param.id, body);

    return new ResponseDto();
  }

  async deleteProjectOption(param: ProjectOptionParamDto) {
    const projectOptionQuery = new ProjectOptionQuery(this.dataSource);
    const has = await projectOptionQuery.hasProjectOptionById(param.id);

    if (has === false) {
      throw new NotFoundProjectOptionException();
    }

    await projectOptionQuery.deleteProjectOption(param.id);

    return new ResponseDto();
  }
}
