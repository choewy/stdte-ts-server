import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { ListDto, ResponseDto, UserQuery } from '@server/common';

import { UserListQueryDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async getUsers(query: UserListQueryDto) {
    return new ResponseDto(
      new ListDto(query, await new UserQuery(this.dataSource).findUsersAsList(query.skip, query.take)),
    );
  }
}
