import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(private readonly dataSource: DataSource) {}
}
