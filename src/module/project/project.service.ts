import { DataSource, InsertResult } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { ProjectOrderRecord, ProjectSaleRecord } from '@entity';
import { XlsxService } from '@server/core';
import {
  AlreadyExistProjectCodeException,
  BusinessCategoryQuery,
  CustomerQuery,
  DownloadDto,
  DownloadFormat,
  IndustryCategoryQuery,
  ListDto,
  NotFoundProjectException,
  NotFoundProjectOrderRecordException,
  NotFoundProjectSaleRecordException,
  ProjectQuery,
  ProjectRecordQuery,
  ProjectUsersQuery,
  TaskMainCategoryQuery,
} from '@server/common';

import { ProjectRecordType } from './enums';
import {
  ProjectCreateBodyDto,
  ProjectDto,
  ProjectListQueryDto,
  ProjectParamDto,
  ProjectRecordCreateBodyDto,
  ProjectRecordParamDto,
  ProjectRecordDto,
  ProjectRecordListQueryDto,
  ProjectRecordUpdateBodyDto,
  ProjectUpdateBodyDto,
  ProjectXlsxRowDto,
} from './dto';

@Injectable()
export class ProjectService {
  constructor(private readonly dataSource: DataSource) {}

  async getProjects(query: ProjectListQueryDto) {
    const projectQuery = new ProjectQuery(this.dataSource);

    return new ListDto(query, await projectQuery.findProjectList(query), ProjectDto);
  }

  async downloadProjects() {
    const projectQuery = new ProjectQuery(this.dataSource);
    const projects = await projectQuery.findAll();

    const xlsxService = new XlsxService();
    const worksheet = xlsxService.fromObjects(projects.map((project) => new ProjectXlsxRowDto(project)));
    const buffer = xlsxService.save([{ sheet: worksheet, name: '사업목록' }]);

    return new DownloadDto(buffer, DownloadFormat.Xlsx, '사업목록');
  }

  async createProject(body: ProjectCreateBodyDto) {
    const projectQuery = new ProjectQuery(this.dataSource);

    if (await projectQuery.hasProjectByCode(body.code)) {
      throw new AlreadyExistProjectCodeException();
    }

    const projectId = await this.dataSource.transaction(async (em) => {
      const projectQuery = new ProjectQuery(em);
      const projectUsersQuery = new ProjectUsersQuery(em);
      const customerQuery = new CustomerQuery(em);
      const businessCategoryQuery = new BusinessCategoryQuery(em);
      const industryCategoryQuery = new IndustryCategoryQuery(em);
      const taskMainCategoryQuery = new TaskMainCategoryQuery(em);

      const insert = await projectQuery.insertProject({
        name: body.name,
        code: body.code,
        description: body.description,
        difficulty: body.difficulty,
        amount: body.amount,
        status: body.status,
        startDate: body.startDate,
        endDate: body.endDate,
        customer: await customerQuery.findCustomerOnlyId(body.customer),
        businessCategory: await businessCategoryQuery.findBusinessCategoryOnlyId(body.businessCategory),
        industryCategory: await industryCategoryQuery.findIndustryCategoryOnlyId(body.industryCategory),
        taskMainCategory: await taskMainCategoryQuery.findTaskMainCategoryOnlyId(body.taskCategory),
        canExpose: body.canExpose,
      });

      const projectId = insert.raw.insertId;
      await projectUsersQuery.updateProjectUsers(projectId, {
        externalOwners: body.externalOwners,
        externalManagers: body.externalManagers,
        externalLeaders: body.externalLeaders,
        internalOwners: body.internalOwners,
        internalManagers: body.internalManagers,
        internalLeaders: body.internalLeaders,
      });

      return projectId;
    });

    const project = await projectQuery.findProjectById(projectId);

    if (project == null) {
      throw new NotFoundProjectException();
    }

    return new ProjectDto(project);
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
        customer: body.customer ? await customerQuery.findCustomerOnlyId(body.customer) : undefined,
        businessCategory: body.businessCategory
          ? await businessCategoryQuery.findBusinessCategoryOnlyId(body.businessCategory)
          : undefined,
        industryCategory: body.industryCategory
          ? await industryCategoryQuery.findIndustryCategoryOnlyId(body.industryCategory)
          : undefined,
        taskMainCategory: body.taskCategory
          ? await taskMainCategoryQuery.findTaskMainCategoryOnlyId(body.taskCategory)
          : undefined,
        canExpose: body.canExpose,
      });

      await projectUsersQuery.updateProjectUsers(param.id, {
        externalOwners: body.externalOwners,
        externalManagers: body.externalManagers,
        externalLeaders: body.externalLeaders,
        internalOwners: body.internalOwners,
        internalManagers: body.internalManagers,
        internalLeaders: body.internalLeaders,
      });
    });

    const project = await projectQuery.findProjectById(param.id);

    if (project == null) {
      throw new NotFoundProjectException();
    }

    return new ProjectDto(project);
  }

  async deleteProject(param: ProjectParamDto) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const hasProject = await projectQuery.hasProjectById(param.id);

    if (hasProject === false) {
      throw new NotFoundProjectException();
    }

    await projectQuery.deleteProject(param.id);
  }

  async getProjectRecords(param: ProjectParamDto, query: ProjectRecordListQueryDto) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const hasProject = await projectQuery.hasProjectById(param.id);

    if (hasProject === false) {
      throw new NotFoundProjectException();
    }

    const projectRecordQuery = new ProjectRecordQuery(this.dataSource);

    let projectRecords: [Array<ProjectOrderRecord | ProjectSaleRecord>, number] = [[], 0];

    switch (query.type) {
      case ProjectRecordType.Order:
        projectRecords = await projectRecordQuery.findProjectOrderRecordList(param.id, query);
        break;

      case ProjectRecordType.Sale:
        projectRecords = await projectRecordQuery.findProjectSaleRecordList(param.id, query);
        break;
    }

    return new ListDto(query, projectRecords, ProjectRecordDto);
  }

  async createProjectRecord(body: ProjectRecordCreateBodyDto) {
    const projectQuery = new ProjectQuery(this.dataSource);
    const hasProject = await projectQuery.hasProjectById(body.project.id);

    if (hasProject === false) {
      throw new NotFoundProjectException();
    }

    const projectRecordQuery = new ProjectRecordQuery(this.dataSource);

    let insert: InsertResult;
    let projectRecordId: number;
    let projectRecord: ProjectOrderRecord | ProjectSaleRecord | null;

    switch (body.type) {
      case ProjectRecordType.Order:
        insert = await projectRecordQuery.insertProjectOrderRecord({
          date: body.date,
          amount: body.amount,
          description: body.description,
          project: body.project,
        });

        projectRecordId = insert.identifiers[0]?.id;

        if (projectRecordId == null) {
          throw new NotFoundProjectOrderRecordException();
        }

        projectRecord = await projectRecordQuery.findProjectOrderRecordById(projectRecordId);

        if (projectRecord == null) {
          throw new NotFoundProjectOrderRecordException();
        }

        break;

      case ProjectRecordType.Sale:
        insert = await projectRecordQuery.insertProjectSaleRecord({
          date: body.date,
          amount: body.amount,
          description: body.description,
          project: body.project,
        });

        projectRecordId = insert.identifiers[0]?.id;

        if (projectRecordId == null) {
          throw new NotFoundProjectSaleRecordException();
        }

        projectRecord = await projectRecordQuery.findProjectSaleRecordById(projectRecordId);

        if (projectRecord == null) {
          throw new NotFoundProjectSaleRecordException();
        }

        break;
    }

    return new ProjectRecordDto(projectRecord);
  }

  async updateProjectRecord(param: ProjectRecordParamDto, body: ProjectRecordUpdateBodyDto) {
    const projectRecordQuery = new ProjectRecordQuery(this.dataSource);

    let hasProjectRecord: boolean;

    switch (param.type) {
      case ProjectRecordType.Order:
        hasProjectRecord = await projectRecordQuery.hasProjectOrderRecordById(param.id);

        if (hasProjectRecord === false) {
          throw new NotFoundProjectOrderRecordException();
        }

        await projectRecordQuery.updateProjectOrderRecord(param.id, {
          date: body.date,
          amount: body.amount,
          description: body.description,
        });
        break;

      case ProjectRecordType.Sale:
        hasProjectRecord = await projectRecordQuery.hasProjectSaleRecordById(param.id);

        if (hasProjectRecord === false) {
          throw new NotFoundProjectSaleRecordException();
        }

        await projectRecordQuery.updateProjectSaleRecord(param.id, {
          date: body.date,
          amount: body.amount,
          description: body.description,
        });
        break;
    }

    let projectRecord: ProjectOrderRecord | ProjectSaleRecord | null;

    switch (param.type) {
      case ProjectRecordType.Order:
        projectRecord = await projectRecordQuery.findProjectOrderRecordById(param.id);

        if (projectRecord == null) {
          throw new NotFoundProjectOrderRecordException();
        }
        break;

      case ProjectRecordType.Sale:
        projectRecord = await projectRecordQuery.findProjectSaleRecordById(param.id);

        if (projectRecord == null) {
          throw new NotFoundProjectSaleRecordException();
        }
        break;
    }

    return new ProjectRecordDto(projectRecord);
  }

  async deleteProjectRecord(param: ProjectRecordParamDto) {
    const projectRecordQuery = new ProjectRecordQuery(this.dataSource);

    let hasProjectRecord: boolean;

    switch (param.type) {
      case ProjectRecordType.Order:
        hasProjectRecord = await projectRecordQuery.hasProjectOrderRecordById(param.id);

        if (hasProjectRecord === false) {
          throw new NotFoundProjectOrderRecordException();
        }

        await projectRecordQuery.deleteProjectOrderRecord(param.id);
        break;

      case ProjectRecordType.Sale:
        hasProjectRecord = await projectRecordQuery.hasProjectSaleRecordById(param.id);

        if (hasProjectRecord === false) {
          throw new NotFoundProjectSaleRecordException();
        }
        await projectRecordQuery.deleteProjectSaleRecord(param.id);
        break;
    }
  }
}
