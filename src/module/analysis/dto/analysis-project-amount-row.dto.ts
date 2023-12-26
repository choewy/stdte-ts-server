import { AnalysisProjectAmountColDto } from './analysis-project-amount-col.dto';

export class AnalysisProjectAmountRowDto {
  id: number;
  row: string;
  cols: AnalysisProjectAmountColDto[];

  constructor(id: number, row: string, cols: AnalysisProjectAmountColDto[]) {
    this.id = id;
    this.row = row;
    this.cols = cols;
  }
}
