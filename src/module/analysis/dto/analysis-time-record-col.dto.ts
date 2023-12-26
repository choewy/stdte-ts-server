export class AnalysisTimeRecordColDto {
  pid?: number;
  year: string;
  time: string;

  constructor(year: string, time: string, pid?: number) {
    this.pid = pid;
    this.year = year;
    this.time = time;
  }
}
