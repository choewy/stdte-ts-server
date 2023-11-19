import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { InjectReaderDataSource, HttpRequestLogQuery, User } from '@server/common';

import { GetLogListBodyDto, HttpRequestLogListResponseDto, HttpRequestLogResponseDto } from './dto';

@Injectable()
export class LogService {
  constructor(
    @InjectReaderDataSource()
    private readonly readerDataSource: DataSource,
  ) {}

  async getHttpRequestLogList(user: User, body: GetLogListBodyDto): Promise<HttpRequestLogListResponseDto> {
    const httpRequestLogQuery = HttpRequestLogQuery.of(this.readerDataSource);

    const [rows, total] = await httpRequestLogQuery.findAndCountHttpRequestLogs(
      user.id,
      body.skip,
      body.take,
      body.methods,
      body.statusCodes,
      body.order,
    );

    return new HttpRequestLogListResponseDto(
      total,
      rows.map((row) => new HttpRequestLogResponseDto(row)),
      body,
    );
  }
}
