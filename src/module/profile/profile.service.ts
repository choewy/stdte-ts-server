import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { InjectWriterDataSource, NotFoundMyProfileException, User, UserQuery } from '@server/common';

import { ProfileResponseDto, UpdateProfileBodyDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectWriterDataSource()
    private readonly writerDataSource: DataSource,
  ) {}

  async getMyProfile(user: User): Promise<ProfileResponseDto> {
    return new ProfileResponseDto(user);
  }

  async updateMyProfile(user: User, body: UpdateProfileBodyDto): Promise<void> {
    const updateResult = await UserQuery.of(this.writerDataSource).updateUser(user.id, {
      name: body.name ?? undefined,
      phone: body.phone,
      birthday: body.birthday,
      genderCode: body.genderCode,
      scienceCode: body.scienceCode,
      degree: body.degree,
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
