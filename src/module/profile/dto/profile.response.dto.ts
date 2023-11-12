import { ApiResponseProperty } from '@nestjs/swagger';

import {
  AUTH_STATUS_TEXTS,
  EMPLOYMENT_STATUS_TEXTS,
  DEGREE_TEXTS,
  GenderCode,
  Role,
  Team,
  User,
  toEnumValues,
} from '@server/common';
import { EnumMapResponseDto } from '@server/dto';

import { ProfileRoleResponseDto } from './profile-role.response.dto';
import { ProfileTeamResponseDto } from './profile-team.response.dto';

export class ProfileResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: Date })
  birthday: Date | null;

  @ApiResponseProperty({
    type: Number,
    enum: GenderCode,
    example: toEnumValues(GenderCode, Number).join(' | '),
  })
  genderCode: GenderCode | null;

  @ApiResponseProperty({ type: String })
  scienceCode: string | null;

  @ApiResponseProperty({ type: EnumMapResponseDto })
  degree: EnumMapResponseDto;

  @ApiResponseProperty({ type: String })
  school: string | null;

  @ApiResponseProperty({ type: String })
  major: string | null;

  @ApiResponseProperty({ type: String })
  carType: string | null;

  @ApiResponseProperty({ type: String })
  carNumber: string | null;

  @ApiResponseProperty({ type: EnumMapResponseDto })
  authStatus: EnumMapResponseDto;

  @ApiResponseProperty({ type: EnumMapResponseDto })
  employmentStatus: EnumMapResponseDto;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: ProfileRoleResponseDto })
  role: ProfileRoleResponseDto = null;

  @ApiResponseProperty({ type: ProfileTeamResponseDto })
  team: ProfileTeamResponseDto = null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.birthday = user.birthday;
    this.genderCode = user.genderCode;
    this.scienceCode = user.scienceCode;
    this.degree = new EnumMapResponseDto(user.degree, DEGREE_TEXTS);
    this.school = user.school;
    this.major = user.major;
    this.carType = user.carType;
    this.carNumber = user.carNumber;
    this.authStatus = new EnumMapResponseDto(user.authStatus, AUTH_STATUS_TEXTS);
    this.employmentStatus = new EnumMapResponseDto(user.employmentStatus, EMPLOYMENT_STATUS_TEXTS);
    this.createdAt = user.createdAt;

    if (user.role instanceof Role) {
      this.role = new ProfileRoleResponseDto(user.role);
    }

    if (user.team instanceof Team) {
      this.team = new ProfileTeamResponseDto(user.team);
    }
  }
}
