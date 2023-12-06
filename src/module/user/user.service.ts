import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { UserListQueryDto } from './dto';
import { ListDto, ResponseDto, UserQuery } from '@server/common';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async getUsers(query: UserListQueryDto) {
    return new ResponseDto(
      new ListDto(query, await new UserQuery(this.dataSource).findUsersAsList(query.take, query.skip)),
    );
  }
}
