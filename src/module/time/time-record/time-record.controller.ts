import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { TimeRecordService } from './time-record.service';
import { TimeRecordListBodyDto, TimeRecordParamDto, TimeRecordUpdateBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('record/time')
export class TimeRecordController {
  constructor(private readonly timeRecordService: TimeRecordService) {}

  @Post()
  async getTimeRecords(@Body() body: TimeRecordListBodyDto) {
    return this.timeRecordService.getTimeRecords(body);
  }

  @Patch()
  async updateTimeRecord(@Req() req: Request, @Body() body: TimeRecordUpdateBodyDto) {
    return this.timeRecordService.updateTimeRecord(req.userId, body);
  }

  @Delete(':id')
  async deleteTimeRecord(@Req() req: Request, @Param() param: TimeRecordParamDto) {
    return this.timeRecordService.deleteTimeRecord(req.userId, param);
  }
}
