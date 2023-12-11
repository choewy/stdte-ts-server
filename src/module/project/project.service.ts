import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  ProjectCreateBodyDto,
  ProjectDto,
  ProjectListQueryDto,
  ProjectOrderRecordUpdateBodyDto,
  ProjectParamDto,
  ProjectSaleRecordUpdateBodyDto,
  ProjectUpdateBodyDto,
} from './dto';
import {
  AlreadyExistProjectCodeException,
  BusinessCategoryQuery,
  CustomerQuery,
  IndustryCategoryQuery,
  InsertDto,
  ListDto,
  NotFoundProjectException,
  ProjectQuery,
  ProjectRecordQuery,
  ProjectUsersQuery,
  TaskMainCategoryQuery,
} from '@server/common';

@Injectable()
export class ProjectService {
  constructor(private readonly dataSource: DataSource) {}

  async getProjects(query: ProjectListQueryDto) {
    const projectQuery = new ProjectQuery(this.dataSource);

    return new ListDto(query, await projectQuery.findProjectList(query), ProjectDto);
  }

  async getProject(param: ProjectParamDto) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const project = await projectQuery.findProjectById(param.id);

    if (project == null) {
      throw new NotFoundProjectException();
    }

    return new ProjectDto(project);
  }

  async createProject(body: ProjectCreateBodyDto) {
    const projectQuery = new ProjectQuery(this.dataSource);

    if (await projectQuery.hasProjectByCode(body.code)) {
      throw new AlreadyExistProjectCodeException();
    }

    const insert = await this.dataSource.transaction(async (em) => {
      const projectQuery = new ProjectQuery(em);
      const projectRecordQuery = new ProjectRecordQuery(em);
      const projectUsersQuery = new ProjectUsersQuery(em);
      const customerQuery = new CustomerQuery(em);
      const businessCategoryQuery = new BusinessCategoryQuery(em);
      const industryCategoryQuery = new IndustryCategoryQuery(em);
      const taskMainCategoryQuery = new TaskMainCategoryQuery(em);

      const project = await projectQuery.insertProject({
        ...body,
        customer: await customerQuery.findCustomerOnlyId(body.customer),
        businessCategory: await businessCategoryQuery.findBusinessCategoryOnlyId(body.businessCategory),
        industryCategory: await industryCategoryQuery.findIndustryCategoryOnlyId(body.industryCategory),
        taskMainCategory: await taskMainCategoryQuery.findTaskMainCategoryOnlyId(body.taskMainCategory),
      });

      await projectRecordQuery.insertProjectRecords(project.raw.insertId);
      await projectUsersQuery.updateProjectUsers(project.raw.insertId, body);

      return project;
    });

    return new InsertDto(insert);
  }

  async updateProject(param: ProjectParamDto, body: ProjectUpdateBodyDto) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const hasProject = await projectQuery.hasProjectById(param.id);

    if (hasProject === false) {
      throw new NotFoundProjectException();
    }

    if (body.code) {
      if (await projectQuery.hasProjectByCodeOmitId(param.id, body.code)) {
        throw new AlreadyExistProjectCodeException();
      }
    }

    await this.dataSource.transaction(async (em) => {
      const projectQuery = new ProjectQuery(em);
      const projectUsersQuery = new ProjectUsersQuery(em);
      const customerQuery = new CustomerQuery(em);
      const businessCategoryQuery = new BusinessCategoryQuery(em);
      const industryCategoryQuery = new IndustryCategoryQuery(em);
      const taskMainCategoryQuery = new TaskMainCategoryQuery(em);

      await projectQuery.updateProject(param.id, {
        name: body.name,
        code: body.code,
        description: body.description,
        difficulty: body.difficulty,
        amount: body.amount,
        status: body.status,
        startDate: body.startDate,
        endDate: body.endDate,
        keepDate: body.keepDate,
        customer: body.customer ? await customerQuery.findCustomerOnlyId(body.customer) : undefined,
        businessCategory: body.businessCategory
          ? await businessCategoryQuery.findBusinessCategoryOnlyId(body.businessCategory)
          : undefined,
        industryCategory: body.industryCategory
          ? await industryCategoryQuery.findIndustryCategoryOnlyId(body.industryCategory)
          : undefined,
        taskMainCategory: body.taskMainCategory
          ? await taskMainCategoryQuery.findTaskMainCategoryOnlyId(body.taskMainCategory)
          : undefined,
      });

      await projectUsersQuery.updateProjectUsers(param.id, body);
    });
  }

  async updateProjectOrderRecord(param: ProjectParamDto, body: ProjectOrderRecordUpdateBodyDto) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const hasProject = await projectQuery.hasProjectById(param.id);

    if (hasProject === false) {
      throw new NotFoundProjectException();
    }

    const projectRecordQuery = new ProjectRecordQuery(this.dataSource);
    await projectRecordQuery.updateProjectOrderRecord(param.id, body);
  }

  async updateProjectSaleRecord(param: ProjectParamDto, body: ProjectSaleRecordUpdateBodyDto) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const hasProject = await projectQuery.hasProjectById(param.id);

    if (hasProject === false) {
      throw new NotFoundProjectException();
    }

    const projectRecordQuery = new ProjectRecordQuery(this.dataSource);
    await projectRecordQuery.updateProjectSaleRecord(param.id, body);
  }

  async deleteProject(param: ProjectParamDto) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const hasProject = await projectQuery.hasProjectById(param.id);

    if (hasProject === false) {
      throw new NotFoundProjectException();
    }

    await projectQuery.deleteProject(param.id);
  }
}
