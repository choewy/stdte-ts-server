import { DataSource, EntityManager, Not } from 'typeorm';

import { Project, ProjectType } from '@entity';

import { EntityQuery } from '../class';

export class ProjectQuery extends EntityQuery<Project> {
  constructor(connection: DataSource | EntityManager) {
    super(connection, Project);
  }

  async hasProjectById(id: number) {
    return this.repository.exist({ where: { id } });
  }

  async hasProjectByCode(code: string) {
    return this.repository.exist({ where: { code } });
  }

  async hasProjectByCodeOmitId(id: number, code: string) {
    return this.repository.exist({ where: { id: Not(id), code } });
  }

  async findProjectsAsList(teamId?: number, take?: number, skip?: number) {
    const builder = this.repository
      .createQueryBuilder('project')
      .leftJoinAndMapOne('project.projectType', 'project.projectType', 'projectType')
      .leftJoinAndMapMany('project.teams', 'project.teams', 'teams')
      .leftJoinAndMapOne('teams.team', 'teams.team', 'team')
      .leftJoinAndMapMany('project.owners', 'project.owners', 'owners')
      .leftJoinAndMapOne('owners.user', 'owners.user', 'owner')
      .leftJoinAndMapMany('project.managers', 'project.managers', 'managers')
      .leftJoinAndMapOne('managers.user', 'managers.user', 'manager')
      .leftJoinAndMapMany('project.leaders', 'project.leaders', 'leaders')
      .leftJoinAndMapOne('leaders.user', 'leaders.user', 'leader')
      .where('1 = 1')
      .take(take)
      .skip(skip);

    if (typeof teamId === 'number') {
      builder.andWhere('teams.id = :teamId', { teamId });
    }

    return builder.getManyAndCount();
  }

  async insertProject(
    pick: Pick<
      Project,
      | 'name'
      | 'code'
      | 'scope'
      | 'status'
      | 'orderer'
      | 'summary'
      | 'income'
      | 'startDate'
      | 'deadlineDate'
      | 'maintenanceDate'
    > & {
      projectType: ProjectType | null | undefined;
    },
  ) {
    return this.repository.save(
      this.repository.create({
        name: pick.name,
        code: pick.code,
        scope: pick.scope,
        status: pick.status,
        orderer: pick.orderer,
        summary: pick.summary,
        income: pick.income,
        startDate: pick.startDate,
        deadlineDate: pick.deadlineDate,
        maintenanceDate: pick.maintenanceDate,
        projectType: pick.projectType,
      }),
    );
  }

  async updateProject(
    id: number,
    partial: Partial<
      Pick<
        Project,
        | 'name'
        | 'code'
        | 'scope'
        | 'status'
        | 'orderer'
        | 'summary'
        | 'income'
        | 'startDate'
        | 'deadlineDate'
        | 'maintenanceDate'
      > & {
        projectType: ProjectType | null;
      }
    >,
  ) {
    await this.repository.update(
      id,
      this.repository.create({
        name: partial.name,
        code: partial.code,
        scope: partial.scope,
        status: partial.status,
        orderer: partial.orderer,
        summary: partial.summary,
        income: partial.income,
        startDate: partial.startDate,
        deadlineDate: partial.deadlineDate,
        maintenanceDate: partial.maintenanceDate,
        projectType: partial.projectType,
      }),
    );
  }

  async deleteProject(id: number) {
    await this.repository.softDelete({ id });
  }
}
