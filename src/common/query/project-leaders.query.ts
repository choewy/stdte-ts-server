import { DataSource, EntityManager } from 'typeorm';

import { ProjectLeaders } from '@entity';

import { EntityQuery } from '../class';

export class ProjectLeadersQuery extends EntityQuery<ProjectLeaders> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, ProjectLeaders);
  }

  async upsertByLeaders(projectId: number, leaderIds: number[]) {
    if (leaderIds.length === 0) {
      return;
    }

    await this.repository.delete({ projectId });
    await this.repository.upsert(
      leaderIds.map((userId) => this.repository.create({ projectId, userId })),
      { conflictPaths: { projectId: true, userId: true } },
    );
  }

  async deleteByProject(projectId: number) {
    await this.repository.delete({ projectId });
  }
}
