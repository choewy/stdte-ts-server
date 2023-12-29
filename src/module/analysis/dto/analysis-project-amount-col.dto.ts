import { ProjectRecordAnalysisRaw } from '@server/common';

import { AnalysisProjectRecordYearDto } from './analysis-project-record-year.dto';

export class AnalysisProjectAmountColDto {
  year: string;
  amount: string;
  rate: string;

  constructor(years: AnalysisProjectRecordYearDto[], raw: ProjectRecordAnalysisRaw) {
    const total = years.find((year) => year.year === raw.year)?.amount ?? '0';

    this.year = raw.year;
    this.amount = raw.amount;
    this.rate = (Math.round((Number(raw.amount) / Number(total)) * 1000) / 10).toFixed(1);
  }
}
