import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';

import { ProjectOrderRecord, ProjectSaleRecord } from '@entity';

export class ProjectRecordQuery {
  private readonly projectOrderRecordRepository: Repository<ProjectOrderRecord>;
  private readonly projectSaleRecordRepository: Repository<ProjectSaleRecord>;

  constructor(connection: DataSource | EntityManager) {
    this.projectOrderRecordRepository = connection.getRepository(ProjectOrderRecord);
    this.projectSaleRecordRepository = connection.getRepository(ProjectSaleRecord);
  }

  async insertProjectOrderRecord(projectId: number, entity: DeepPartial<ProjectOrderRecord>) {
    await this.projectOrderRecordRepository.insert(
      this.projectOrderRecordRepository.create({ project: { id: projectId }, ...entity }),
    );
  }

  async insertProjectSaleRecord(projectId: number, entity: DeepPartial<ProjectSaleRecord>) {
    await this.projectSaleRecordRepository.insert(
      this.projectSaleRecordRepository.create({ project: { id: projectId }, ...entity }),
    );
  }

  async updateProjectOrderRecord(id: number, entity: DeepPartial<ProjectOrderRecord>) {
    return this.projectOrderRecordRepository.update({ id }, this.projectOrderRecordRepository.create(entity));
  }

  async updateProjectSaleRecord(id: number, entity: DeepPartial<ProjectOrderRecord>) {
    return this.projectSaleRecordRepository.update({ id }, this.projectSaleRecordRepository.create(entity));
  }
}
