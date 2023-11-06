import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { InjectReaderDataSource, InjectWriterDataSource, NotFoundMyProfileException, UserQuery } from '@server/common';

import { ProfileResponseDto, UpdateProfileBodyDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectWriterDataSource()
    private readonly writerDataSource: DataSource,
    @InjectReaderDataSource()
    private readonly readerDataSource: DataSource,
  ) {}

  async getMyProfile(id: number): Promise<ProfileResponseDto> {
    const user = await UserQuery.of(this.readerDataSource).findUserByUserId(id);

    if (!user) {
      throw new NotFoundMyProfileException();
    }

    return new ProfileResponseDto(user);
  }

  async updateMyProfile(id: number, body: UpdateProfileBodyDto): Promise<void> {
    const updateResult = await UserQuery.of(this.writerDataSource).updateUser(id, {
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
