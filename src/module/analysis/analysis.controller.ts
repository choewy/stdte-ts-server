import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { AnalysisService } from './analysis.service';
import { AnalysisDateRangeQuery } from './dto';

@UseGuards(JwtGuard, CredentialsGuard)
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('project/records/orders')
  @UseGuards(RoleGuard)
  @SetRolePolicy({ project: RolePolicyLevel.Read })
  async getProjectOrders(@Query() query: AnalysisDateRangeQuery) {
    return this.analysisService.getProjectRecords('orders', query);
  }

  @Get('project/records/sales')
  @UseGuards(RoleGuard)
  @SetRolePolicy({ project: RolePolicyLevel.Read })
  async getProjectSales(@Query() query: AnalysisDateRangeQuery) {
    return this.analysisService.getProjectRecords('sales', query);
  }

  @Get('project/records/download')
  @UseGuards(RoleGuard)
  @SetRolePolicy({ project: RolePolicyLevel.Read })
  async createProjectRecordsFile(@Query() query: AnalysisDateRangeQuery) {
    return this.analysisService.createProjectRecordsFile(query);
  }

  @Get('times')
  @UseGuards(RoleGuard)
  @SetRolePolicy({ project: RolePolicyLevel.Read })
  async getTimeRecords(@Query() query: AnalysisDateRangeQuery) {
    return this.analysisService.getTimeRecords(query);
  }

  @Get('times/download')
  @UseGuards(RoleGuard)
  @SetRolePolicy({ project: RolePolicyLevel.Read })
  async createTimeRecordsFile(@Query() query: AnalysisDateRangeQuery) {
    return this.analysisService.createTimeRecordsFile(query);
  }

  @Get('users')
  @UseGuards(RoleGuard)
  @SetRolePolicy({ user: RolePolicyLevel.Read })
  async getUserRecords(@Query() query: AnalysisDateRangeQuery) {
    return this.analysisService.getUserRecords(query);
  }

  @Get('users/download')
  @UseGuards(RoleGuard)
  @SetRolePolicy({ user: RolePolicyLevel.Read })
  async createUserRecordsFile(@Query() query: AnalysisDateRangeQuery) {
    return this.analysisService.createUserRecordsFile(query);
  }
}
