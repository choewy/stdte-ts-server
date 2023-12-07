import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { CreateProjectBodyDto, ProjectListQueryDto, UpdateProjectBodyDto } from './dto';
import { ProjectParamDto } from './dto/project.param.dto';
import {
  AlreadyExistProjectCodeException,
  ListDto,
  NotFoundProjectException,
  ProjectLeadersQuery,
  ProjectManagersQuery,
  ProjectOwnersQuery,
  ProjectQuery,
  ProjectTeamsQuery,
  ProjectTypeQuery,
  ResponseDto,
  TeamQuery,
  UserQuery,
} from '@server/common';

@Injectable()
export class ProjectService {
  constructor(private readonly dataSource: DataSource) {}

  async getProjects(query: ProjectListQueryDto) {
    return new ResponseDto(
      new ListDto(
        query,
        await new ProjectQuery(this.dataSource).findProjectsAsList(query.teamId, query.take, query.skip),
      ),
    );
  }

  async createProject(body: CreateProjectBodyDto) {
    const has = await new ProjectQuery(this.dataSource).hasProjectByCode(body.code);

    if (has) {
      throw new AlreadyExistProjectCodeException();
    }

    await this.dataSource.transaction(async (em) => {
      const projectType = await new ProjectTypeQuery(em).findProjectTypeByid(body.projectType);
      const project = await new ProjectQuery(em).insertProject({ ...body, projectType });

      const teamQuery = new TeamQuery(em);
      const userQuery = new UserQuery(em);

      await new ProjectTeamsQuery(em).upsertByTeams(project.id, await teamQuery.findTeamIdsByids(body.teams));
      await new ProjectOwnersQuery(em).upsertByOwners(project.id, await userQuery.findUserIdsByids(body.owners));
      await new ProjectManagersQuery(em).upsertByManagers(project.id, await userQuery.findUserIdsByids(body.managers));
      await new ProjectLeadersQuery(em).upsertByLeaders(project.id, await userQuery.findUserIdsByids(body.leaders));
    });

    return new ResponseDto();
  }

  async updateProject(param: ProjectParamDto, body: UpdateProjectBodyDto) {
    const projectQuery = new ProjectQuery(this.dataSource);

    const has = await projectQuery.hasProjectById(param.id);

    if (has === false) {
      throw new NotFoundProjectException();
    }

    if (typeof body.code === 'string') {
      if (await projectQuery.hasProjectByCodeOmitId(param.id, body.code)) {
        throw new AlreadyExistProjectCodeException();
      }
    }

    await this.dataSource.transaction(async (em) => {
      await new ProjectQuery(em).updateProject(param.id, {
        ...body,
        projectType: await new ProjectTypeQuery(em).findProjectTypeByid(body.projectType),
      });

      const teamQuery = new TeamQuery(em);
      const userQuery = new UserQuery(em);

      if (Array.isArray(body.teams)) {
        await new ProjectTeamsQuery(em).upsertByTeams(param.id, await teamQuery.findTeamIdsByids(body.teams));
      }

      if (Array.isArray(body.owners)) {
        await new ProjectOwnersQuery(em).upsertByOwners(param.id, await userQuery.findUserIdsByids(body.owners));
      }

      if (Array.isArray(body.managers)) {
        await new ProjectManagersQuery(em).upsertByManagers(param.id, await userQuery.findUserIdsByids(body.managers));
      }

      if (Array.isArray(body.leaders)) {
        await new ProjectLeadersQuery(em).upsertByLeaders(param.id, await userQuery.findUserIdsByids(body.leaders));
      }
    });

    return new ResponseDto();
  }

  async deleteProject(param: ProjectParamDto) {
    const has = await new ProjectQuery(this.dataSource).hasProjectById(param.id);

    if (has === false) {
      throw new NotFoundProjectException();
    }

    await this.dataSource.transaction(async (em) => {
      await new ProjectQuery(em).deleteProject(param.id);
      await new ProjectTeamsQuery(em).deleteByProject(param.id);
      await new ProjectOwnersQuery(em).deleteByProject(param.id);
      await new ProjectManagersQuery(em).deleteByProject(param.id);
      await new ProjectLeadersQuery(em).deleteByProject(param.id);
    });
  }
}
