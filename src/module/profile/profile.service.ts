import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { InvalidCredentialsException, ResponseDto, UserQuery } from '@server/common';
import { UpdateMyProfileBodyDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private readonly dataSource: DataSource) {}

  async getMyProfile(userId: number) {
    const user = await new UserQuery(this.dataSource).findUserById(userId);

    if (user == null) {
      throw new InvalidCredentialsException();
    }

    return {
      name: user.name,
      phone: user.phone,
      birthday: user.birthday,
      genderCode: user.genderCode,
      scienceCode: user.scienceCode,
      degree: user.degree,
      school: user.school,
      major: user.major,
      carType: user.carType,
      carNumber: user.carNumber,
      status: user.status,
      updatedAt: user.updatedAt,
    };
  }

  async updateMyProfile(userId: number, body: UpdateMyProfileBodyDto) {
    await new UserQuery(this.dataSource).updateUserProfile(userId, body);

    return new ResponseDto();
  }
}
