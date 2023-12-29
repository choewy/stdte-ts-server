import { AnalysisProjectAmountRowDto } from './analysis-project-amount-row.dto';
import { AnalysisProjectRecordYearDto } from './analysis-project-record-year.dto';

export class AnalysisProjectRecordResultDto {
  years: AnalysisProjectRecordYearDto[];
  rows: AnalysisProjectAmountRowDto[];

  constructor(years: AnalysisProjectRecordYearDto[], rows: AnalysisProjectAmountRowDto[]) {
    this.years = years;
    this.rows = rows;
  }
}
