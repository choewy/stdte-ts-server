import { ProjectRecordAnalysisYear } from '@server/common';

export class AnalysisProjectRecordYearDto {
  year: string;
  amount: string;

  constructor(year: string, raws: ProjectRecordAnalysisYear[]) {
    this.year = year;
    this.amount = raws.find((raw) => raw.year === year)?.amount ?? '0';
  }
}
