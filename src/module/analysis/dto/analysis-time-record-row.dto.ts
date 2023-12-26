import { Project, User } from '@entity';
import { TimeRecordAnalysisRaw } from '@server/common';

export class AnalysisTimeRecordDto {
  id: number;
  name: string;
  code: string;
  years: Array<{ year: string; time: string }> = [];
  rows: Array<
    Pick<User, 'id' | 'name'> & {
      year: string;
      time: string;
    }
  >;

  constructor(project: Project, years: string[], raws: TimeRecordAnalysisRaw[]) {
    this.id = project.id;
    this.name = project.name;
    this.code = project.code ?? '';
    this.years = years.map((year) => {
      const time = raws
        .filter((raw) => raw.pid === project.id && raw.year === year)
        .reduce<number>((time, val) => {
          time += Number(val.time);
          return time;
        }, 0)
        .toFixed(2);

      return { year, time };
    });
    this.rows = raws
      .filter((raw) => raw.pid === project.id)
      .map((raw) => ({
        id: raw.uid,
        name: raw.uname,
        year: raw.year,
        time: raw.time,
      }));
  }
}
