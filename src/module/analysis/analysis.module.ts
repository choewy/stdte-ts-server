import { Module } from '@nestjs/common';

import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { AnalysisExcelService } from './analysis-excel.service';

@Module({
  controllers: [AnalysisController],
  providers: [AnalysisService, AnalysisExcelService],
})
export class AnalysisModule {}
