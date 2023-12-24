import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';

import { ProjectOrderRecord, ProjectSaleRecord } from '@entity';

import { DateRangeArgs, ProjectRecordAnalysisRaw, ProjectRecordQueryFindListArgs } from './types';

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

  async findProjectOrderRecordAnalysis(args: DateRangeArgs) {
    const queryBuilder = this.projectOrderRecordRepository
      .createQueryBuilder('row')
      .innerJoin('row.project', 'project')
      .select('SUM(row.amount)', 'amount')
      .where('row.date >= :s', { s: args.s })
      .andWhere('row.date <= :e', { e: args.e });

    const totalQueryBuilder = queryBuilder.clone();

    const customerQueryBuilder = queryBuilder
      .clone()
      .innerJoin('project.customer', 'customer')
      .addSelect('DATE_FORMAT(row.date, "%Y" )', 'year')
      .addSelect('customer.id', 'id')
      .addSelect('customer.alias', 'row')
      .groupBy('customer.id')
      .addGroupBy('year');

    const businessCategoryQueryBuilder = queryBuilder
      .clone()
      .innerJoin('project.businessCategory', 'businessCategory')
      .addSelect('DATE_FORMAT(row.date, "%Y" )', 'year')
      .addSelect('businessCategory.id', 'id')
      .addSelect('businessCategory.name', 'row')
      .groupBy('businessCategory.id')
      .addGroupBy('year');

    const industryCategoryQueryBuilder = queryBuilder
      .clone()
      .innerJoin('project.industryCategory', 'industryCategory')
      .addSelect('DATE_FORMAT(row.date, "%Y" )', 'year')
      .addSelect('industryCategory.id', 'id')
      .addSelect('industryCategory.name', 'row')
      .groupBy('industryCategory.id')
      .addGroupBy('year');

    return Promise.all([
      totalQueryBuilder.getRawOne<{ amount: string }>(),
      customerQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
      businessCategoryQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
      industryCategoryQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
    ]);
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

  async findProjectSaleRecordAnalysis(args: DateRangeArgs) {
    const queryBuilder = this.projectSaleRecordRepository
      .createQueryBuilder('row')
      .innerJoin('row.project', 'project')
      .select('SUM(row.amount)', 'amount')
      .where('row.date >= :s', { s: args.s })
      .andWhere('row.date <= :e', { e: args.e });

    const totalQueryBuilder = queryBuilder.clone();

    const customerQueryBuilder = queryBuilder
      .clone()
      .innerJoin('project.customer', 'customer')
      .addSelect('DATE_FORMAT(row.date, "%Y" )', 'year')
      .addSelect('customer.id', 'id')
      .addSelect('customer.alias', 'row')
      .groupBy('customer.id')
      .addGroupBy('year');

    const businessCategoryQueryBuilder = queryBuilder
      .clone()
      .innerJoin('project.businessCategory', 'businessCategory')
      .addSelect('DATE_FORMAT(row.date, "%Y" )', 'year')
      .addSelect('businessCategory.id', 'id')
      .addSelect('businessCategory.name', 'row')
      .groupBy('businessCategory.id')
      .addGroupBy('year');

    const industryCategoryQueryBuilder = queryBuilder
      .clone()
      .innerJoin('project.industryCategory', 'industryCategory')
      .addSelect('DATE_FORMAT(row.date, "%Y" )', 'year')
      .addSelect('industryCategory.id', 'id')
      .addSelect('industryCategory.name', 'row')
      .groupBy('industryCategory.id')
      .addGroupBy('year');

    return Promise.all([
      totalQueryBuilder.getRawOne<{ amount: string }>(),
      customerQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
      businessCategoryQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
      industryCategoryQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
    ]);
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
