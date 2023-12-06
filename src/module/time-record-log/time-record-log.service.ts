import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeRecordLogService {
  constructor(private readonly dataSource: DataSource) {}
}
