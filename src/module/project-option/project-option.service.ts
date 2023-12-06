import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectOptionService {
  constructor(private readonly dataSource: DataSource) {}
}
