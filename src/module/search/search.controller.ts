import { Controller, Post } from '@nestjs/common';

import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('users')
  async searchUsers() {
    return this.searchService.searchUsers;
  }

  @Post('roles')
  async searchRoles() {
    return this.searchService.searchRoles;
  }

  @Post('projects/types')
  async searchProjectTypes() {
    return this.searchService.searchProjectTypes;
  }

  @Post('projects/options')
  async searchProjectOptions() {
    return this.searchService.searchProjectOptions;
  }
}
