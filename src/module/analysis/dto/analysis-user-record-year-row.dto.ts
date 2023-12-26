export class AnalysisUserRecordYearRowDto {
  year: string;
  months: number;
  days: number;
  avgMonths: number;
  avgDays: number;
  active: number;
  enter: number;
  leave: number;

  constructor(year: string) {
    this.year = year;
    this.months = 0;
    this.days = 0;
    this.active = 0;
    this.enter = 0;
    this.leave = 0;
    this.avgDays = 0;
    this.avgMonths = 0;
  }
}
