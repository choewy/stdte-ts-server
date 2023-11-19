import { ApiResponseProperty } from '@nestjs/swagger';

import {
  AuthStatus,
  Degree,
  EmploymentStatus,
  GenderCode,
  Role,
  Team,
  User,
  getEnumValuesOnlyNumber,
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
    example: getEnumValuesOnlyNumber(GenderCode).join(' | '),
  })
  genderCode: GenderCode | null;

  @ApiResponseProperty({ type: String })
  scienceCode: string | null;

  @ApiResponseProperty({ type: String, example: Object.values(Degree).join(' | ') })
  degree: Degree;

  @ApiResponseProperty({ type: String })
  school: string | null;

  @ApiResponseProperty({ type: String })
  major: string | null;

  @ApiResponseProperty({ type: String })
  carType: string | null;

  @ApiResponseProperty({ type: String })
  carNumber: string | null;

  @ApiResponseProperty({ type: String, example: Object.values(AuthStatus).join(' | ') })
  authStatus: AuthStatus;

  @ApiResponseProperty({ type: String, example: Object.values(EmploymentStatus).join(' | ') })
  employmentStatus: EmploymentStatus;

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
    this.degree = user.degree;
    this.school = user.school;
    this.major = user.major;
    this.carType = user.carType;
    this.carNumber = user.carNumber;
    this.authStatus = user.authStatus;
    this.employmentStatus = user.employmentStatus;
    this.createdAt = user.createdAt;

    if (user.role instanceof Role) {
      this.role = new ProfileRoleResponseDto(user.role);
    }

    if (user.team instanceof Team) {
      this.team = new ProfileTeamResponseDto(user.team);
    }
  }
}
