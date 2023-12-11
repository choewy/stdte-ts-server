import { TimeLog } from '@entity';

import { toISOString } from '@server/common';

export class TimeLogDto {
  id: number;
  name: string;
  updatedAt: string | null;

  constructor(timeLog: TimeLog) {
    this.id = timeLog.user.id;
    this.name = timeLog.user.name;
    this.updatedAt = toISOString(timeLog.lastUpdatedAt);
  }
}
