import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { InvalidCredentialsException, UserQuery } from '@server/common';

import { ProfileDto, ProfileUpdateBodyDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private readonly dataSource: DataSource) {}

  async getProfile(userId: number) {
    const userQuery = new UserQuery(this.dataSource);
    const user = await userQuery.findUserById(userId);

    if (user == null) {
      throw new InvalidCredentialsException();
    }

    return new ProfileDto(user);
  }

  async updateProfile(userId: number, body: ProfileUpdateBodyDto) {
    const userQuery = new UserQuery(this.dataSource);
    const hasUser = await userQuery.hasUserById(userId);

    if (hasUser === false) {
      throw new InvalidCredentialsException();
    }

    await userQuery.updateUser(userId, body);
  }
}
