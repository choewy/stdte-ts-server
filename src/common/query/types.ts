import { CredentialsStatus, ProjectStatus } from '@entity';

export type FindListArgs = {
  take: number;
  skip: number;
};

export type DateRangeArgs = {
  s: string;
  e: string;
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
  canExpose?: boolean;
  customer?: number;
  status?: ProjectStatus;
};

export type ProjectRecordQueryFindListArgs = FindListArgs;

export type TimeRecordQueryFindsArgs = DateRangeArgs & {
  userId: number;
};

export type TimeRecordQueryHasOverTimeArgs = {
  user: { id: number };
  date: string;
  time: string;
};

export type TimeMemoQueryFindsArgs = DateRangeArgs & {
  userId: number;
};

export type ProjectRecordAnalysisYear = {
  year: string;
  amount: string;
};

export type ProjectRecordAnalysisRaw = {
  id: number;
  row: string;
  year: string;
  amount: string;
};

export type ProjectRecordAnalysisResults = [
  ProjectRecordAnalysisYear[],
  ProjectRecordAnalysisRaw[],
  ProjectRecordAnalysisYear[],
  ProjectRecordAnalysisRaw[],
  ProjectRecordAnalysisYear[],
  ProjectRecordAnalysisRaw[],
];

export type TimeRecordAnalysisRaw = {
  pid: number;
  uid: number;
  year: string;
  time: string;
};
