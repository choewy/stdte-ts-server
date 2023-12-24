import { AnalysisProjectAmountRowDto } from './analysis-project-amount-row.dto';

export class AnalysisProjectAmountListDto {
  total: string;
  customers: AnalysisProjectAmountRowDto[];
  businessCategories: AnalysisProjectAmountRowDto[];
  industryCategories: AnalysisProjectAmountRowDto[];

  constructor(
    total: string,
    customers: AnalysisProjectAmountRowDto[],
    businessCategories: AnalysisProjectAmountRowDto[],
    industryCategories: AnalysisProjectAmountRowDto[],
  ) {
    this.total = total;
    this.customers = customers;
    this.businessCategories = businessCategories;
    this.industryCategories = industryCategories;
  }
}
