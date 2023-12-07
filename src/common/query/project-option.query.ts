import { DataSource, EntityManager } from 'typeorm';

import { ProjectOption } from '@entity';

import { EntityQuery } from '../class';

export class ProjectOptionQuery extends EntityQuery<ProjectOption> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, ProjectOption);
  }

  async hasProjectOptionById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async insertProjectOption(pick: Pick<ProjectOption, 'name'> & { projectTypeId: number }) {
    await this.repository.insert(
      this.repository.create({
        projectType: { id: pick.projectTypeId },
        name: pick.name,
      }),
    );
  }

  async updateProjectOption(id: number, partial: Partial<Pick<ProjectOption, 'name'> & { projectTypeId?: number }>) {
    await this.repository.update(
      { id },
      { name: partial.name, projectType: partial.projectTypeId ? { id: partial.projectTypeId } : undefined },
    );
  }

  async deleteProjectOption(id: number) {
    await this.repository.delete({ id });
  }
}
