import { Request as ExpressRequest } from 'express';

import { User } from '@entity';
import { DateTime } from 'luxon';

export type Request = ExpressRequest & {
  id: string;
  requesteAt: DateTime;
  responsedAt: DateTime;
  userId?: number | null;
  user?: User | null;
};
