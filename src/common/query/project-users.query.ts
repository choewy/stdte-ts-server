import { DataSource, DeepPartial, EntityManager, FindOptionsWhere, In, Repository } from 'typeorm';

import { ProjectExternalManagers, ProjectInternalLeaders, ProjectInternalManagers, User } from '@entity';

export class ProjectUsersQuery {
  private readonly userRepository: Repository<User>;
  private readonly projectInternalManagersRepository: Repository<ProjectInternalManagers>;
  private readonly projectInternalLeadersRepository: Repository<ProjectInternalLeaders>;
  private readonly projectExternalManagersRepository: Repository<ProjectExternalManagers>;

  constructor(connection: DataSource | EntityManager) {
    this.userRepository = connection.getRepository(User);
    this.projectExternalManagersRepository = connection.getRepository(ProjectExternalManagers);
    this.projectInternalManagersRepository = connection.getRepository(ProjectInternalManagers);
    this.projectInternalLeadersRepository = connection.getRepository(ProjectInternalLeaders);
  }

  async findUsersOnlyId(entities: User[]) {
    if (entities.length === 0) {
      return [];
    }

    const users = await this.userRepository.find({
      select: { id: true },
      where: { id: In(entities.map(({ id }) => id)) },
    });

    return users;
  }

  async updateProjectUsers(
    projectId: number,
    args: Partial<Record<'externalManagers' | 'internalManagers' | 'internalLeaders', User[]>>,
  ) {
    if (args.externalManagers) {
      const users = await this.findUsersOnlyId(args.externalManagers);
      await this.deleteProjectExternalManagers({ projectId });

      if (args.externalManagers.length > 0) {
        await this.upsertProjectExternalManagers(users.map((user) => ({ projectId, userId: user.id })));
      }
    }

    if (args.internalManagers) {
      const users = await this.findUsersOnlyId(args.internalManagers);
      await this.deleteProjectInternalManagers({ projectId });

      if (args.internalManagers.length > 0) {
        await this.upsertProjectInternalManagers(users.map((user) => ({ projectId, userId: user.id })));
      }
    }

    if (args.internalLeaders) {
      const users = await this.findUsersOnlyId(args.internalLeaders);
      await this.deleteProjectInternalLeaders({ projectId });

      if (args.internalLeaders.length > 0) {
        await this.upsertProjectInternalLeaders(users.map((user) => ({ projectId, userId: user.id })));
      }
    }
  }

  async upsertProjectExternalManagers(entities: DeepPartial<ProjectExternalManagers>[]) {
    return this.projectExternalManagersRepository.upsert(entities, {
      conflictPaths: { projectId: true, userId: true },
    });
  }

  async upsertProjectInternalManagers(entities: DeepPartial<ProjectInternalManagers>[]) {
    return this.projectInternalManagersRepository.upsert(entities, {
      conflictPaths: { projectId: true, userId: true },
    });
  }

  async upsertProjectInternalLeaders(entities: DeepPartial<ProjectInternalLeaders>[]) {
    return this.projectInternalLeadersRepository.upsert(entities, {
      conflictPaths: { projectId: true, userId: true },
    });
  }

  async deleteProjectExternalManagers(where: FindOptionsWhere<ProjectExternalManagers>) {
    return this.projectExternalManagersRepository.delete(where);
  }

  async deleteProjectInternalManagers(where: FindOptionsWhere<ProjectInternalManagers>) {
    return this.projectInternalManagersRepository.delete(where);
  }

  async deleteProjectInternalLeaders(where: FindOptionsWhere<ProjectInternalLeaders>) {
    return this.projectInternalLeadersRepository.delete(where);
  }
}
