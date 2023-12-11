import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';

import { ProjectOrderRecord, ProjectSaleRecord } from '@entity';

export class ProjectRecordQuery {
  private readonly projectOrderRecordRepository: Repository<ProjectOrderRecord>;
  private readonly projectSaleRecordRepository: Repository<ProjectSaleRecord>;

  constructor(connection: DataSource | EntityManager) {
    this.projectOrderRecordRepository = connection.getRepository(ProjectOrderRecord);
    this.projectSaleRecordRepository = connection.getRepository(ProjectSaleRecord);
  }

  async insertProjectRecords(projectId: number) {
    await this.projectOrderRecordRepository.insert(this.projectOrderRecordRepository.create({ projectId }));
    await this.projectSaleRecordRepository.insert(this.projectSaleRecordRepository.create({ projectId }));
  }

  async updateProjectOrderRecord(projectId: number, entity: DeepPartial<ProjectOrderRecord>) {
    return this.projectOrderRecordRepository.update({ projectId }, entity);
  }

  async updateProjectSaleRecord(projectId: number, entity: DeepPartial<ProjectOrderRecord>) {
    return this.projectSaleRecordRepository.update({ projectId }, entity);
  }
}
