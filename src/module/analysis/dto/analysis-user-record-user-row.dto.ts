import { User } from '@entity';

import { toSQLDate } from '@server/common';

import { AnalysisuserRecordUserColDto } from './analysis-user-record-user-col.dto';

export class AnalysisUserRecordUserRowDto {
  id: number;
  name: string;
  enteringDay: string;
  resignationDay: string;
  cols: AnalysisuserRecordUserColDto[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.enteringDay = toSQLDate(user.enteringDay) ?? '';
    this.resignationDay = toSQLDate(user.resignationDay) ?? '';
    this.cols = [];
  }
}
