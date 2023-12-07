import { DataSource, EntityManager } from 'typeorm';

import { ProjectType } from '@entity';

import { EntityQuery } from '../class';

export class ProjectTypeQuery extends EntityQuery<ProjectType> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, ProjectType);
  }

  async hasProjectTypeById(id: number) {
    return this.repository.exist({ where: { id } });
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

  async findProjectTypesAsList(skip?: number, take?: number) {
    const builder = this.repository
      .createQueryBuilder('projectType')
      .leftJoinAndMapMany('projectType.projectOptions', 'projectType.projectOptions', 'projectOptions')
      .leftJoinAndMapMany('projectType.projects', 'projectType.projects', 'projects')
      .leftJoinAndMapOne('projectType.team', 'projectType.team', 'team')
      .where('1 = 1')
      .skip(skip)
      .take(take);

    return builder.getManyAndCount();
  }

  async insertProjectType(pick: Pick<ProjectType, 'name'>) {
    await this.repository.insert(this.repository.create({ name: pick.name }));
  }

  async updateProjectType(id: number, partial: Partial<Pick<ProjectType, 'name'>>) {
    await this.repository.update({ id }, { name: partial.name });
  }

  async deleteProjectType(id: number) {
    await this.repository.delete({ id });
  }
}
