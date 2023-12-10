import { Project, ProjectStatus } from '@entity';

export class CustomerProjectDto {
  id: number;
  name: string;
  code: string;
  description: string;
  status: ProjectStatus;

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.code = project.code;
    this.description = project.description ?? '';
    this.status = project.status;
  }
}
