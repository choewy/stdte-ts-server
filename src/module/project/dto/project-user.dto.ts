import {
  ProjectExternalLeaders,
  ProjectExternalManagers,
  ProjectExternalOwners,
  ProjectInternalLeaders,
  ProjectInternalManagers,
  ProjectInternalOwners,
} from '@entity';

export class ProjectUserDto {
  id: number;
  name: string;

  constructor(
    projectUser:
      | ProjectInternalOwners
      | ProjectInternalManagers
      | ProjectInternalLeaders
      | ProjectExternalOwners
      | ProjectExternalManagers
      | ProjectExternalLeaders,
  ) {
    this.id = projectUser.user.id;
    this.name = projectUser.user.name;
  }
}
