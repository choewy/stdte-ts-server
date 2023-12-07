import { DataSource, EntityManager } from 'typeorm';

import { ProjectOwners } from '@entity';

import { EntityQuery } from '../class';

export class ProjectOwnersQuery extends EntityQuery<ProjectOwners> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, ProjectOwners);
  }

  async upsertByOwners(projectId: number, ownerIds: number[]) {
    if (ownerIds.length === 0) {
      return;
    }

    await this.repository.delete({ projectId });
    await this.repository.upsert(
      ownerIds.map((userId) => this.repository.create({ projectId, userId })),
      { conflictPaths: { projectId: true, userId: true } },
    );
  }

  async deleteByProject(projectId: number) {
    await this.repository.delete({ projectId });
  }
}
