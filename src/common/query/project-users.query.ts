import { DataSource, DeepPartial, EntityManager, FindOptionsWhere, In, Repository } from 'typeorm';

import {
  ProjectExternalLeaders,
  ProjectExternalManagers,
  ProjectExternalOwners,
  ProjectInternalLeaders,
  ProjectInternalManagers,
  ProjectInternalOwners,
  User,
} from '@entity';

export class ProjectUsersQuery {
  private readonly userRepository: Repository<User>;
  private readonly projectInternalOwnersRepository: Repository<ProjectInternalOwners>;
  private readonly projectInternalManagersRepository: Repository<ProjectInternalManagers>;
  private readonly projectInternalLeadersRepository: Repository<ProjectInternalLeaders>;
  private readonly projectExternalOwnersRepository: Repository<ProjectExternalOwners>;
  private readonly projectExternalManagersRepository: Repository<ProjectExternalManagers>;
  private readonly projectExternalLeadersRepository: Repository<ProjectExternalLeaders>;

  constructor(connection: DataSource | EntityManager) {
    this.userRepository = connection.getRepository(User);
    this.projectInternalOwnersRepository = connection.getRepository(ProjectInternalOwners);
    this.projectInternalManagersRepository = connection.getRepository(ProjectInternalManagers);
    this.projectInternalLeadersRepository = connection.getRepository(ProjectInternalLeaders);
    this.projectExternalOwnersRepository = connection.getRepository(ProjectExternalOwners);
    this.projectExternalManagersRepository = connection.getRepository(ProjectExternalManagers);
    this.projectExternalLeadersRepository = connection.getRepository(ProjectExternalLeaders);
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
    args: Partial<
      Record<
        | 'internalOwners'
        | 'internalManagers'
        | 'internalLeaders'
        | 'externalOwners'
        | 'externalManagers'
        | 'externalLeaders',
        User[]
      >
    >,
  ) {
    if (args.internalOwners) {
      const users = await this.findUsersOnlyId(args.internalOwners);
      await this.deleteProjectInternalOwners({ projectId });

      if (args.internalOwners.length > 0) {
        await this.upsertProjectInternalOwners(users.map((user) => ({ projectId, userId: user.id })));
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

    if (args.externalOwners) {
      const users = await this.findUsersOnlyId(args.externalOwners);
      await this.deleteProjectExternalOwners({ projectId });

      if (args.externalOwners.length > 0) {
        await this.upsertProjectExternalOwners(users.map((user) => ({ projectId, userId: user.id })));
      }
    }

    if (args.externalManagers) {
      const users = await this.findUsersOnlyId(args.externalManagers);
      await this.deleteProjectExternalManagers({ projectId });

      if (args.externalManagers.length > 0) {
        await this.upsertProjectExternalManagers(users.map((user) => ({ projectId, userId: user.id })));
      }
    }

    if (args.externalLeaders) {
      const users = await this.findUsersOnlyId(args.externalLeaders);
      await this.deleteProjectExternalLeaders({ projectId });

      if (args.externalLeaders.length > 0) {
        await this.upsertProjectExternalLeaders(users.map((user) => ({ projectId, userId: user.id })));
      }
    }
  }

  async upsertProjectInternalOwners(entities: DeepPartial<ProjectInternalOwners>[]) {
    return this.projectInternalOwnersRepository.upsert(entities, {
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

  async upsertProjectExternalOwners(entities: DeepPartial<ProjectExternalOwners>[]) {
    return this.projectExternalOwnersRepository.upsert(entities, {
      conflictPaths: { projectId: true, userId: true },
    });
  }

  async upsertProjectExternalManagers(entities: DeepPartial<ProjectExternalManagers>[]) {
    return this.projectExternalManagersRepository.upsert(entities, {
      conflictPaths: { projectId: true, userId: true },
    });
  }

  async upsertProjectExternalLeaders(entities: DeepPartial<ProjectExternalLeaders>[]) {
    return this.projectExternalLeadersRepository.upsert(entities, {
      conflictPaths: { projectId: true, userId: true },
    });
  }

  async deleteProjectInternalOwners(where: FindOptionsWhere<ProjectInternalOwners>) {
    return this.projectInternalOwnersRepository.delete(where);
  }

  async deleteProjectInternalManagers(where: FindOptionsWhere<ProjectInternalManagers>) {
    return this.projectInternalManagersRepository.delete(where);
  }

  async deleteProjectInternalLeaders(where: FindOptionsWhere<ProjectInternalLeaders>) {
    return this.projectInternalLeadersRepository.delete(where);
  }

  async deleteProjectExternalOwners(where: FindOptionsWhere<ProjectExternalOwners>) {
    return this.projectExternalOwnersRepository.delete(where);
  }

  async deleteProjectExternalManagers(where: FindOptionsWhere<ProjectExternalManagers>) {
    return this.projectExternalManagersRepository.delete(where);
  }

  async deleteProjectExternalLeaders(where: FindOptionsWhere<ProjectExternalLeaders>) {
    return this.projectExternalLeadersRepository.delete(where);
  }
}
