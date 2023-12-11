import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}
}
