import {
  AuthStatusText,
  AuthStatusValue,
  DegreeText,
  DegreeValue,
  EmploymentStatusText,
  EmploymentStatusValue,
  GenderCode,
  MapResponseDto,
  Role,
  Team,
  User,
  toAuthStatusText,
  toDegreeText,
  toEmploymentStatusText,
} from '@server/common';

import { ProfileRoleResponseDto } from './profile-role.response.dto';
import { ProfileTeamResponseDto } from './profile-team.response.dto';

export class ProfileResponseDto {
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;
  public readonly birthday: Date | null;
  public readonly genderCode: GenderCode | null;
  public readonly scienceCode: string | null;
  public readonly degree: MapResponseDto<DegreeValue, DegreeText>;
  public readonly school: string | null;
  public readonly major: string | null;
  public readonly carType: string | null;
  public readonly carNumber: string | null;
  public readonly authStatus: MapResponseDto<AuthStatusValue, AuthStatusText>;
  public readonly employmentStatus: MapResponseDto<EmploymentStatusValue, EmploymentStatusText>;
  public readonly createdAt: Date;
  public readonly role: ProfileRoleResponseDto = null;
  public readonly team: ProfileTeamResponseDto = null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.birthday = user.birthday;
    this.genderCode = user.genderCode;
    this.scienceCode = user.scienceCode;
    this.degree = new MapResponseDto(user.degree, toDegreeText);
    this.school = user.school;
    this.major = user.major;
    this.carType = user.carType;
    this.carNumber = user.carNumber;
    this.authStatus = new MapResponseDto(user.authStatus, toAuthStatusText);
    this.employmentStatus = new MapResponseDto(user.employmentStatus, toEmploymentStatusText);
    this.createdAt = user.createdAt;

    if (user.role instanceof Role) {
      this.role = new ProfileRoleResponseDto(user.role);
    }

    if (user.team instanceof Team) {
      this.team = new ProfileTeamResponseDto(user.team);
    }
  }
}
