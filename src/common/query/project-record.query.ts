import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';

import { ProjectOrderRecord, ProjectSaleRecord } from '@entity';

import { ProjectRecordQueryFindListArgs } from './types';

export class ProjectRecordQuery {
  private readonly projectOrderRecordRepository: Repository<ProjectOrderRecord>;
  private readonly projectSaleRecordRepository: Repository<ProjectSaleRecord>;

  constructor(connection: DataSource | EntityManager) {
    this.projectOrderRecordRepository = connection.getRepository(ProjectOrderRecord);
    this.projectSaleRecordRepository = connection.getRepository(ProjectSaleRecord);
  }

  async hasProjectOrderRecordById(id: number) {
    return this.projectOrderRecordRepository.exist({
      where: { id },
    });
  }

  async findProjectOrderRecordById(id: number) {
    return this.projectOrderRecordRepository.findOne({
      where: { id },
    });
  }

  async findProjectOrderRecordList(projectId: number, args: ProjectRecordQueryFindListArgs) {
    return this.projectOrderRecordRepository.findAndCount({
      where: { project: { id: projectId } },
      skip: args.skip,
      take: args.take,
      order: { date: 'ASC' },
    });
  }

  async hasProjectSaleRecordById(id: number) {
    return this.projectSaleRecordRepository.exist({
      where: { id },
    });
  }

  async findProjectSaleRecordById(id: number) {
    return this.projectSaleRecordRepository.findOne({
      where: { id },
    });
  }

  async findProjectSaleRecordList(projectId: number, args: ProjectRecordQueryFindListArgs) {
    return this.projectSaleRecordRepository.findAndCount({
      where: { project: { id: projectId } },
      skip: args.skip,
      take: args.take,
      order: { date: 'ASC' },
    });
  }

  async insertProjectOrderRecord(entity: DeepPartial<ProjectOrderRecord>) {
    return this.projectOrderRecordRepository.insert(this.projectOrderRecordRepository.create(entity));
  }

  async insertProjectSaleRecord(entity: DeepPartial<ProjectSaleRecord>) {
    return this.projectSaleRecordRepository.insert(this.projectSaleRecordRepository.create(entity));
  }

  async updateProjectOrderRecord(id: number, entity: DeepPartial<ProjectOrderRecord>) {
    return this.projectOrderRecordRepository.update({ id }, this.projectOrderRecordRepository.create(entity));
  }

  async updateProjectSaleRecord(id: number, entity: DeepPartial<ProjectOrderRecord>) {
    return this.projectSaleRecordRepository.update({ id }, this.projectSaleRecordRepository.create(entity));
  }

  async deleteProjectOrderRecord(id: number) {
    return this.projectOrderRecordRepository.delete({ id });
  }

  async deleteProjectSaleRecord(id: number) {
    return this.projectSaleRecordRepository.delete({ id });
  }
}
