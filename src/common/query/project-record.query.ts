import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';

import { ProjectOrderRecord, ProjectSaleRecord } from '@entity';

import {
  DateRangeArgs,
  ProjectRecordAnalysisRaw,
  ProjectRecordAnalysisResults,
  ProjectRecordAnalysisYear,
  ProjectRecordQueryFindListArgs,
} from './types';

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

  private createFindProjectRecordAnalysisQueryBuilder(type: 'orders' | 'sales', args: DateRangeArgs) {
    let repository: Repository<ProjectOrderRecord> | Repository<ProjectSaleRecord>;

    switch (type) {
      case 'orders':
        repository = this.projectOrderRecordRepository;
        break;

      case 'sales':
        repository = this.projectSaleRecordRepository;
        break;
    }

    return repository
      .createQueryBuilder('row')
      .innerJoin('row.project', 'project')
      .select('DATE_FORMAT(row.date, "%Y" )', 'year')
      .addSelect('SUM(row.amount)', 'amount')
      .where('row.date >= :s', { s: args.s })
      .andWhere('row.date <= :e', { e: args.e });
  }

  async findProjectRecordAnalysisGroupByCustomers(type: 'orders' | 'sales', args: DateRangeArgs) {
    const queryBuilder = this.createFindProjectRecordAnalysisQueryBuilder(type, args).innerJoin(
      'project.customer',
      'customer',
    );

    const yearsQueryBuilder = queryBuilder.clone().groupBy('year');
    const rawsQueryBuilder = queryBuilder
      .clone()
      .addSelect('customer.id', 'id')
      .addSelect('customer.alias', 'row')
      .groupBy('customer.id')
      .addGroupBy('year');

    return {
      years: await yearsQueryBuilder.getRawMany<ProjectRecordAnalysisYear>(),
      raws: await rawsQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
    };
  }

  async findProjectRecordAnalysisGroupByBusinessCategory(type: 'orders' | 'sales', args: DateRangeArgs) {
    const queryBuilder = this.createFindProjectRecordAnalysisQueryBuilder(type, args).innerJoin(
      'project.businessCategory',
      'category',
    );

    const yearsQueryBuilder = queryBuilder.clone().groupBy('year');
    const rawsQueryBuilder = queryBuilder
      .clone()
      .addSelect('category.id', 'id')
      .addSelect('category.name', 'row')
      .groupBy('category.id')
      .addGroupBy('year');

    return {
      years: await yearsQueryBuilder.getRawMany<ProjectRecordAnalysisYear>(),
      raws: await rawsQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
    };
  }

  async findProjectRecordAnalysisGroupByIndustryCategory(type: 'orders' | 'sales', args: DateRangeArgs) {
    const queryBuilder = this.createFindProjectRecordAnalysisQueryBuilder(type, args).innerJoin(
      'project.industryCategory',
      'category',
    );

    const yearsQueryBuilder = queryBuilder.clone().groupBy('year');
    const rawsQueryBuilder = queryBuilder
      .clone()
      .addSelect('category.id', 'id')
      .addSelect('category.name', 'row')
      .groupBy('category.id')
      .addGroupBy('year');

    return {
      years: await yearsQueryBuilder.getRawMany<ProjectRecordAnalysisYear>(),
      raws: await rawsQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
    };
  }

  async findProjectOrderRecordAnalysis(
    type: 'orders' | 'sales',
    args: DateRangeArgs,
  ): Promise<ProjectRecordAnalysisResults> {
    let repository: Repository<ProjectOrderRecord> | Repository<ProjectSaleRecord>;

    switch (type) {
      case 'orders':
        repository = this.projectOrderRecordRepository;
        break;

      case 'sales':
        repository = this.projectSaleRecordRepository;
        break;
    }

    const queryBuilder = repository
      .createQueryBuilder('row')
      .innerJoin('row.project', 'project')
      .select('DATE_FORMAT(row.date, "%Y" )', 'year')
      .addSelect('SUM(row.amount)', 'amount')
      .where('row.date >= :s', { s: args.s })
      .andWhere('row.date <= :e', { e: args.e });

    const customerQueryBuilder = queryBuilder.clone().innerJoin('project.customer', 'customer');
    const customerYearsQueryBuilder = customerQueryBuilder.clone().groupBy('year');
    const customerRowsQueryBuilder = customerQueryBuilder
      .clone()
      .addSelect('customer.id', 'id')
      .addSelect('customer.alias', 'row')
      .groupBy('customer.id')
      .addGroupBy('year');

    const businessCategoryQueryBuilder = queryBuilder.clone().innerJoin('project.businessCategory', 'businessCategory');
    const businessCategoryYearsQueryBuilder = businessCategoryQueryBuilder.clone().groupBy('year');
    const businessCategoryRowsQueryBuilder = businessCategoryQueryBuilder
      .clone()
      .addSelect('businessCategory.id', 'id')
      .addSelect('businessCategory.name', 'row')
      .groupBy('businessCategory.id')
      .addGroupBy('year');

    const industryCategoryQueryBuilder = queryBuilder.clone().innerJoin('project.industryCategory', 'industryCategory');
    const industryCategoryYearsQueryBuilder = industryCategoryQueryBuilder.clone().groupBy('year');
    const industryCategoryRowsQueryBuilder = industryCategoryQueryBuilder
      .clone()
      .addSelect('industryCategory.id', 'id')
      .addSelect('industryCategory.name', 'row')
      .groupBy('industryCategory.id')
      .addGroupBy('year');

    return Promise.all([
      customerYearsQueryBuilder.getRawMany<ProjectRecordAnalysisYear>(),
      customerRowsQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
      businessCategoryYearsQueryBuilder.getRawMany<ProjectRecordAnalysisYear>(),
      businessCategoryRowsQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
      industryCategoryYearsQueryBuilder.getRawMany<ProjectRecordAnalysisYear>(),
      industryCategoryRowsQueryBuilder.getRawMany<ProjectRecordAnalysisRaw>(),
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
