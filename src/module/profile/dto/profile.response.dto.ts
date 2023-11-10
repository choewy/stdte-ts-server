import { ApiResponseProperty } from '@nestjs/swagger';

import {
  AuthStatusMapResponseDto,
  DegreeMapResponseDto,
  EmploymentStatusMapResponseDto,
  GenderCode,
  Role,
  Team,
  User,
  toEnumValues,
} from '@server/common';

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

  @ApiResponseProperty({ type: DegreeMapResponseDto })
  degree: DegreeMapResponseDto;

  @ApiResponseProperty({ type: String })
  school: string | null;

  @ApiResponseProperty({ type: String })
  major: string | null;

  @ApiResponseProperty({ type: String })
  carType: string | null;

  @ApiResponseProperty({ type: String })
  carNumber: string | null;

  @ApiResponseProperty({ type: AuthStatusMapResponseDto })
  authStatus: AuthStatusMapResponseDto;

  @ApiResponseProperty({ type: EmploymentStatusMapResponseDto })
  employmentStatus: EmploymentStatusMapResponseDto;

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
    this.degree = new DegreeMapResponseDto(user.degree);
    this.school = user.school;
    this.major = user.major;
    this.carType = user.carType;
    this.carNumber = user.carNumber;
    this.authStatus = new AuthStatusMapResponseDto(user.authStatus);
    this.employmentStatus = new EmploymentStatusMapResponseDto(user.employmentStatus);
    this.createdAt = user.createdAt;

    if (user.role instanceof Role) {
      this.role = new ProfileRoleResponseDto(user.role);
    }

    if (user.team instanceof Team) {
      this.team = new ProfileTeamResponseDto(user.team);
    }
  }
}
