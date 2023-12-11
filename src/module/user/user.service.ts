import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { ListDto, NotFoundUserException, UserQuery } from '@server/common';

import { UserDto, UserListQueryDto, UserUpdateBodyDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async getUsers(query: UserListQueryDto) {
    const userQuery = new UserQuery(this.dataSource);

    return new ListDto(query, await userQuery.findUserList(query), UserDto);
  }

  async getUser(id: number) {
    const userQuery = new UserQuery(this.dataSource);
    const user = await userQuery.findUserById(id, {
      credentials: true,
      role: { policy: true },
    });

    if (user == null) {
      throw new NotFoundUserException();
    }

    return new UserDto(user);
  }

  async updateUser(id: number, body: UserUpdateBodyDto) {
    const userQuery = new UserQuery(this.dataSource);
    const hasUser = await userQuery.hasUserById(id);

    if (hasUser === false) {
      throw new NotFoundUserException();
    }

    await userQuery.updateUser(id, body);
  }
}
