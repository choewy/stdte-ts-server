import { DataSource, EntityManager } from 'typeorm';

import { ProjectTeams } from '@entity';

import { EntityQuery } from '../class';

export class ProjectTeamsQuery extends EntityQuery<ProjectTeams> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, ProjectTeams);
  }

  async upsertByTeams(projectId: number, teamIds: number[]) {
    if (teamIds.length === 0) {
      return;
    }

    await this.repository.delete({ projectId });
    await this.repository.upsert(
      teamIds.map((teamId) => this.repository.create({ projectId, teamId })),
      { conflictPaths: { projectId: true, teamId: true } },
    );
  }

  async deleteByProject(projectId: number) {
    await this.repository.delete({ projectId });
  }
}
