import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(private readonly dataSource: DataSource) {}
}
