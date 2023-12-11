import { Project, ProjectStatus } from '@entity';

import { DateTimeFormat, toDateFormat, toISOString } from '@server/common';

import { ProjectUserDto } from './project-user.dto';
import { ProjectCustomerDto } from './project-customer.dto';
import { ProjectIndustryCategoryDto } from './project-industry-category.dto';
import { ProjectBusinessCategoryDto } from './project-business-category.dto';
import { ProjectTaskMainCategoryDto } from './project-task-main-category.dto';
import { ProjectOrderRecordDto } from './project-order-record.dto';
import { ProjectSaleRecordDto } from './project-sale-record.dto';

export class ProjectDto {
  id: number;
  name: string;
  code: string;
  description: string;
  difficulty: string;
  amount: string;
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
  keepDate: string | null;
  orderRecord: ProjectOrderRecordDto;
  saleRecord: ProjectSaleRecordDto;
  businessCategory: ProjectIndustryCategoryDto | null;
  industryCategory: ProjectBusinessCategoryDto | null;
  taskMainCategory: ProjectTaskMainCategoryDto | null;
  customer: ProjectCustomerDto | null;
  internalOwners: ProjectUserDto[];
  internalManagers: ProjectUserDto[];
  internalLeaders: ProjectUserDto[];
  externalOwners: ProjectUserDto[];
  externalManagers: ProjectUserDto[];
  externalLeaders: ProjectUserDto[];
  createdAt: string | null;
  updatedAt: string | null;

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.code = project.code;
    this.description = project.description ?? '';
    this.difficulty = project.difficulty;
    this.amount = project.amount;
    this.status = project.status;
    this.startDate = toDateFormat(DateTimeFormat.YYYY_MM_DD, project.startDate);
    this.endDate = toDateFormat(DateTimeFormat.YYYY_MM_DD, project.endDate);
    this.keepDate = toDateFormat(DateTimeFormat.YYYY_MM_DD, project.keepDate);
    this.orderRecord = new ProjectOrderRecordDto(project.orderRecord);
    this.saleRecord = new ProjectOrderRecordDto(project.saleRecord);
    this.customer = project.customer ? new ProjectCustomerDto(project.customer) : null;
    this.businessCategory = project.businessCategory ? new ProjectBusinessCategoryDto(project.businessCategory) : null;
    this.industryCategory = project.industryCategory ? new ProjectIndustryCategoryDto(project.industryCategory) : null;
    this.taskMainCategory = project.taskMainCategory ? new ProjectTaskMainCategoryDto(project.taskMainCategory) : null;
    this.internalOwners = project.internalOwners.map((projectUser) => new ProjectUserDto(projectUser));
    this.internalManagers = project.internalManagers.map((projectUser) => new ProjectUserDto(projectUser));
    this.internalLeaders = project.internalLeaders.map((projectUser) => new ProjectUserDto(projectUser));
    this.externalOwners = project.externalOwners.map((projectUser) => new ProjectUserDto(projectUser));
    this.externalManagers = project.externalManagers.map((projectUser) => new ProjectUserDto(projectUser));
    this.externalLeaders = project.externalLeaders.map((projectUser) => new ProjectUserDto(projectUser));
    this.createdAt = toISOString(project.createdAt);
    this.updatedAt = toISOString(project.updatedAt);
  }
}
