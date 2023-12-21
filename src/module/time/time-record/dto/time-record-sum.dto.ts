export class TimeRecordSumDto {
  date: string;
  total: string;

  constructor(date: string, total: string) {
    this.date = date;
    this.total = total;
  }
}
