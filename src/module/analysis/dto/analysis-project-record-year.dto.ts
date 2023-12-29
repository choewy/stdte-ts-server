export class AnalysisProjectRecordYearDto {
  year: string;
  amount: string;

  constructor(year: string, amount: string) {
    this.year = year;
    this.amount = amount;
  }
}
