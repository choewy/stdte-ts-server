import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeRecordService {
  constructor(private readonly dataSource: DataSource) {}
}