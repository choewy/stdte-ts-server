import { User } from '@entity';

import { AnalysisTimeRecordColDto } from './analysis-time-record-col.dto';

export class AnalysisTimeRecordUserRowDto {
  id: number;
  name: string;
  cols: AnalysisTimeRecordColDto[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.cols = [];
  }
}
