export class AnalysisuserRecordUserColDto {
  year: string;
  months: number;
  days: number;
  descriptions: {
    entered: boolean;
    leaved: boolean;
  };

  constructor(
    year: string,
    months: number,
    days: number,
    descriptions = {
      entered: false,
      leaved: false,
    },
  ) {
    this.year = year;
    this.months = months;
    this.days = days;
    this.descriptions = descriptions;
  }
}
