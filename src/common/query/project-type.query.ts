import { DataSource, EntityManager } from 'typeorm';

import { ProjectType } from '@entity';

import { EntityQuery } from '../class';

export class ProjectTypeQuery extends EntityQuery<ProjectType> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, ProjectType);
  }

  async findProjectTypeByid(id?: number | null) {
    if (id === undefined) {
      return undefined;
    }

    if (id === null) {
      return null;
    }

    const project = await this.repository.findOne({
      select: { id: true },
      where: { id },
    });

    if (project == null) {
      return null;
    }

    return project;
  }
}
