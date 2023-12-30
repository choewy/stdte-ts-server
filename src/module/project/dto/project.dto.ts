import { DateTime } from 'luxon';

import { Project, ProjectStatus } from '@entity';

import { DateTimeFormat, toDateFormat, toISOString } from '@server/common';

import { ProjectUserDto } from './project-user.dto';
import { ProjectCustomerDto } from './project-customer.dto';
import { ProjectIndustryCategoryDto } from './project-industry-category.dto';
import { ProjectBusinessCategoryDto } from './project-business-category.dto';
import { ProjectTaskMainCategoryDto } from './project-task-main-category.dto';

export class ProjectDto {
  id: number;
  name: string;
  code: string;
  description: string;
  difficulty: string;
  amount: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  keepDate: string;
  months: number;
  businessCategory: ProjectIndustryCategoryDto | null;
  industryCategory: ProjectBusinessCategoryDto | null;
  taskCategory: ProjectTaskMainCategoryDto | null;
  customer: ProjectCustomerDto | null;
  internalOwners: ProjectUserDto[];
  internalManagers: ProjectUserDto[];
  internalLeaders: ProjectUserDto[];
  externalOwners: ProjectUserDto[];
  externalManagers: ProjectUserDto[];
  externalLeaders: ProjectUserDto[];
  canExpose: boolean;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.code = project.code ?? '';
    this.description = project.description ?? '';
    this.difficulty = project.difficulty;
    this.amount = project.amount;
    this.status = project.status;
    this.startDate = toDateFormat(DateTimeFormat.YYYY_MM_DD, project.startDate) ?? '';
    this.endDate = toDateFormat(DateTimeFormat.YYYY_MM_DD, project.endDate) ?? '';

    if (project.startDate == null || project.endDate == null) {
      this.months = 0;
    } else {
      const startDate = DateTime.fromJSDate(new Date(project.startDate));
      const endDate = DateTime.fromJSDate(new Date(project.endDate));

      this.months = Math.floor(endDate.diff(startDate, 'months').get('months'));
    }

    this.customer = project.customer ? new ProjectCustomerDto(project.customer) : null;
    this.businessCategory = project.businessCategory ? new ProjectBusinessCategoryDto(project.businessCategory) : null;
    this.industryCategory = project.industryCategory ? new ProjectIndustryCategoryDto(project.industryCategory) : null;
    this.taskCategory = project.taskMainCategory ? new ProjectTaskMainCategoryDto(project.taskMainCategory) : null;
    this.internalOwners = project.internalOwners.map((projectUser) => new ProjectUserDto(projectUser));
    this.internalManagers = project.internalManagers.map((projectUser) => new ProjectUserDto(projectUser));
    this.internalLeaders = project.internalLeaders.map((projectUser) => new ProjectUserDto(projectUser));
    this.externalOwners = project.externalOwners.map((projectUser) => new ProjectUserDto(projectUser));
    this.externalManagers = project.externalManagers.map((projectUser) => new ProjectUserDto(projectUser));
    this.externalLeaders = project.externalLeaders.map((projectUser) => new ProjectUserDto(projectUser));
    this.canExpose = project.canExpose;
    this.createdAt = toISOString(project.createdAt);
    this.updatedAt = toISOString(project.updatedAt);
  }
}
