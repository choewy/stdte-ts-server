import { AppendOrRemove } from './enums';

export type FindListArgs = {
  take: number;
  skip: number;
};

export type AppendOrRemoveArgs = {
  id: number;
  action: AppendOrRemove;
};

export type RoleQueryFindListArgs = FindListArgs;
export type UserQueryFindListArgs = FindListArgs;
export type BusinessCategoryQueryFindListArgs = FindListArgs;
export type IndustryCategoryQueryFindListArgs = FindListArgs;
export type TaskMainCategoryQueryFindListArgs = FindListArgs;
export type CustomerQueryFindListArgs = FindListArgs;
export type ProjectQueryFindListArgs = FindListArgs;
export type TimeRecordQueryFindsArgs = {
  userId: number;
  s: Date;
  e: Date;
};
