import { Project } from '@entity';

import { AnalysisTimeRecordColDto } from './analysis-time-record-col.dto';

export class AnalysisTimeRecordProjectRowDto {
  id: number;
  name: string;
  code: string;
  cols: AnalysisTimeRecordColDto[];

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.code = project.code ?? '';
    this.cols = [];
  }
}
