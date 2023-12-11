import { RolePolicy, RolePolicyLevel, RolePolicyProperty } from '@entity';
import { toISOString } from '@server/common';

export class RolePolicyDto implements RolePolicyProperty {
  setting: RolePolicyLevel;
  roleAndPolicy: RolePolicyLevel;
  credentials: RolePolicyLevel;
  user: RolePolicyLevel;
  customer: RolePolicyLevel;
  project: RolePolicyLevel;
  taskCategory: RolePolicyLevel;
  industryCategory: RolePolicyLevel;
  businessCategory: RolePolicyLevel;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(rolePolicy: RolePolicy) {
    this.setting = rolePolicy.setting;
    this.roleAndPolicy = rolePolicy.roleAndPolicy;
    this.credentials = rolePolicy.credentials;
    this.user = rolePolicy.user;
    this.customer = rolePolicy.customer;
    this.project = rolePolicy.project;
    this.taskCategory = rolePolicy.taskCategory;
    this.industryCategory = rolePolicy.industryCategory;
    this.businessCategory = rolePolicy.businessCategory;
    this.createdAt = toISOString(rolePolicy.createdAt);
    this.updatedAt = toISOString(rolePolicy.updatedAt);
  }
}
