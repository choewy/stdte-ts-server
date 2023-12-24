import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalysisService {
  constructor(private readonly dataSource: DataSource) {}
}
