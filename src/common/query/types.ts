import { CredentialsStatus, ProjectStatus } from '@entity';

export type FindListArgs = {
  take: number;
  skip: number;
};

export type CredentialsQueryFindListArgs = FindListArgs & {
  status: CredentialsStatus;
};

export type RoleQueryFindListArgs = FindListArgs;
export type UserQueryFindListArgs = FindListArgs;
export type BusinessCategoryQueryFindListArgs = FindListArgs;
export type IndustryCategoryQueryFindListArgs = FindListArgs;
export type TaskMainCategoryQueryFindListArgs = FindListArgs;
export type CustomerQueryFindListArgs = FindListArgs;

export type ProjectQueryFindListArgs = FindListArgs & {
  businessCategory?: number;
  industryCategory?: number;
  taskMainCategory?: number;
  customer?: number;
  status?: ProjectStatus;
};

export type ProjectRecordQueryFindListArgs = FindListArgs;

export type TimeRecordQueryFindsArgs = {
  userId: number;
  s: string;
  e: string;
};

export type TimeRecordQueryHasOverTimeArgs = {
  user: { id: number };
  date: string;
  time: string;
};

export type TimeMemoQueryFindsArgs = {
  userId: number;
  s: string;
  e: string;
};
