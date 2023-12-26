export class AnalysisuserRecordUserColDto {
  year: string;
  months: number;
  days: number;

  constructor(year: string, months: number, days: number) {
    this.year = year;
    this.months = months;
    this.days = days;
  }
}
