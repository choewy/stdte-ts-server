import { TimeRecordLog } from '@entity';

import { toISOString } from '@server/common';

export class TimeRecordLogDto {
  id: number;
  name: string;
  updatedAt: string | null;

  constructor(timeRecordLog: TimeRecordLog) {
    this.id = timeRecordLog.user.id;
    this.name = timeRecordLog.user.name;
    this.updatedAt = toISOString(timeRecordLog.lastUpdatedAt);
  }
}
