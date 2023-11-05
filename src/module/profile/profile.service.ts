import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(private readonly dataSource: DataSource) {}

  async getMyProfile() {
    return;
  }
}
