import { ProjectRecordAnalysisRaw } from '@server/common';

export class AnalysisProjectAmountColDto {
  year: string;
  amount: string;
  rate: string;

  constructor(total: string, row: ProjectRecordAnalysisRaw) {
    this.year = row.year;
    this.amount = row.amount;
    this.rate = (Math.round((Number(row.amount) / Number(total)) * 1000) / 10).toFixed(1);
  }
}
