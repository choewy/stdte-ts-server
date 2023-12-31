import { Request as ExpressRequest } from 'express';

import { User } from '@entity';
import { DateTime } from 'luxon';

export type Request = ExpressRequest & {
  id: string;
  requesteAt: DateTime;
  responsedAt: DateTime;
  ignoreLog?: boolean;
  userId: number;
  user?: User | null;
};

export type S3Bucket = Record<'log', string>;

export type DtoConstructor<D, T> = new (args: D) => T;
