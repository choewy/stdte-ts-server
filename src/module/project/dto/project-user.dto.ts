import { ProjectExternalManagers, ProjectInternalLeaders, ProjectInternalManagers } from '@entity';

export class ProjectUserDto {
  id: number;
  name: string;

  constructor(projectUser: ProjectExternalManagers | ProjectInternalManagers | ProjectInternalLeaders) {
    this.id = projectUser.user.id;
    this.name = projectUser.user.name;
  }
}
