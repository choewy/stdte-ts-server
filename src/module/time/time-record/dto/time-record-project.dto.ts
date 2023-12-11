import { Project } from '@entity';

export class TimeRecordProjectDto {
  id: number;

  constructor(project: Project) {
    this.id = project.id;
  }
}
