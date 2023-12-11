import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { ListDto, ProjectQuery } from '@server/common';
import { TimeProjectDto } from './dto';

@Injectable()
export class TimeProjectService {
  constructor(private readonly dataSource: DataSource) {}

  async getTimeProjects() {
    const projectQuery = new ProjectQuery(this.dataSource);

    return new ListDto(undefined, await projectQuery.findProjectListByCanExpose(), TimeProjectDto);
  }
}
