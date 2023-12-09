import { User } from '@entity';
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
