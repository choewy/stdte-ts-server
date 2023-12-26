import { TimeMemo } from '@entity';

import { toISOString } from '@server/common';

export class TimeMemoDto {
  id: number;
  date: string;
  text: string;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(timeMemo: TimeMemo) {
    this.id = timeMemo.id;
    this.date = timeMemo.date;
    this.text = timeMemo.text ?? '';
    this.createdAt = toISOString(timeMemo.createdAt);
    this.updatedAt = toISOString(timeMemo.updatedAt);
  }
}
