import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsService {
  constructor(private readonly dataSource: DataSource) {}
}
