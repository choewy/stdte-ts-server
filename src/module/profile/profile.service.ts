import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { NotFoundMyProfileException, User, UserQuery } from '@server/common';

import { ProfileResponseDto, UpdateProfileBodyDto } from './dto';

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

  async updateMyProfile(id: number, body: UpdateProfileBodyDto): Promise<void> {
    const userQuery = UserQuery.withDataSource(User, this.dataSource);
    const updateResult = await userQuery.updateUser(id, {
      name: body.name ?? undefined,
      phone: body.phone,
      birthday: body.birthday,
      genderCode: body.genderCode,
      scienceCode: body.scienceCode,
      degree: body.degreeValue,
      school: body.school,
      major: body.major,
      carType: body.carType,
      carNumber: body.carNumber,
    });

    if (updateResult.affected === 0) {
      throw new NotFoundMyProfileException();
    }
  }
}
