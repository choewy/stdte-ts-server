import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { InjectReaderDataSource, InjectWriterDataSource } from '@server/common';

@Injectable()
export class TeamService {
  constructor(
    @InjectWriterDataSource()
    private readonly writerDataSource: DataSource,
    @InjectReaderDataSource()
    private readonly readerDataSource: DataSource,
  ) {}
}
