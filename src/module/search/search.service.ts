import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  constructor(private readonly dataSource: DataSource) {}

  async searchUsers() {
    return;
  }

  async searchRoles() {
    return;
  }

  async searchTeams() {
    return;
  }

  async searchProjectTypes() {
    return;
  }

  async searchProjectOptions() {
    return;
  }
}
