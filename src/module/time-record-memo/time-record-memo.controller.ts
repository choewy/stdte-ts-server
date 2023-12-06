import { Controller, Get, Post } from '@nestjs/common';

import { TimeRecordMemoService } from './time-record-memo.service';

@Controller('time-record-memo')
export class TimeRecordMemoController {
  constructor(private readonly timeRecordMemoService: TimeRecordMemoService) {}

  @Get()
  async getTimeRecordMemos() {
    return;
  }

  @Post()
  async deleteOrUpdateTimeRecordMemo() {
    return;
  }
}
