import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeRecordMemoService {
  constructor(private readonly dataSource: DataSource) {}
}
