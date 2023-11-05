import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { NotFoundMyProfileException, User, UserQuery } from '@server/common';
import { ProfileResponseDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private readonly dataSource: DataSource) {}

  async getMyProfile(id: number): Promise<ProfileResponseDto> {
    const userQuery = UserQuery.withDataSource(User, this.dataSource);
    const user = await userQuery.findUserByUserId(id);

    if (!user) {
      throw new NotFoundMyProfileException();
    }

    return new ProfileResponseDto(user);
  }
}
