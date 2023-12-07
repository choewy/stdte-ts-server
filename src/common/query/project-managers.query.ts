import { DataSource, EntityManager } from 'typeorm';

import { ProjectManagers } from '@entity';

import { EntityQuery } from '../class';

export class ProjectManagersQuery extends EntityQuery<ProjectManagers> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, ProjectManagers);
  }

  async upsertByManagers(projectId: number, manangerIds: number[]) {
    if (manangerIds.length === 0) {
      return;
    }

    await this.repository.delete({ projectId });
    await this.repository.upsert(
      manangerIds.map((userId) => this.repository.create({ projectId, userId })),
      { conflictPaths: { projectId: true, userId: true } },
    );
  }

  async deleteByProject(projectId: number) {
    await this.repository.delete({ projectId });
  }
}
