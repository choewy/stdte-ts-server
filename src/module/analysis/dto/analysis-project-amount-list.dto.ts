import { AnalysisProjectAmountRowDto } from './analysis-project-amount-row.dto';

export class AnalysisProjectAmountListDto {
  total: string;
  years: { year: string; amount: string }[];
  customer: AnalysisProjectAmountRowDto[];
  businessCategory: AnalysisProjectAmountRowDto[];
  industryCategory: AnalysisProjectAmountRowDto[];

  constructor(
    total: string,
    years: { year: string; amount: string }[],
    customer: AnalysisProjectAmountRowDto[],
    businessCategory: AnalysisProjectAmountRowDto[],
    industryCategory: AnalysisProjectAmountRowDto[],
  ) {
    this.total = total;
    this.years = years;
    this.customer = customer;
    this.businessCategory = businessCategory;
    this.industryCategory = industryCategory;
  }
}
