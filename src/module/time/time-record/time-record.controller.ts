import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from '@server/common';
import { CredentialsGuard, JwtGuard } from '@server/core';

import { TimeRecordService } from './time-record.service';
import { TimeRecordListBodyDto, TimeRecordParamDto, TimeRecordUpdateBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard)
@Controller('time/record')
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
  async deleteTimeRecord(@Param() param: TimeRecordParamDto) {
    return this.timeRecordService.deleteTimeRecord(param);
  }
}
