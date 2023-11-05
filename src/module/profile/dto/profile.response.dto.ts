import {
  AuthStatusText,
  AuthStatusValue,
  DegreeText,
  DegreeValue,
  EmploymentStatusText,
  EmploymentStatusValue,
  GenderCode,
  MapDto,
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
  public readonly degree: MapDto<DegreeValue, DegreeText>;
  public readonly school: string | null;
  public readonly major: string | null;
  public readonly carType: string | null;
  public readonly carNumber: string | null;
  public readonly authStatus: MapDto<AuthStatusValue, AuthStatusText>;
  public readonly employmentStatus: MapDto<EmploymentStatusValue, EmploymentStatusText>;
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
    this.degree = new MapDto(user.degree, toDegreeText);
    this.school = user.school;
    this.major = user.major;
    this.carType = user.carType;
    this.carNumber = user.carNumber;
    this.authStatus = new MapDto(user.authStatus, toAuthStatusText);
    this.employmentStatus = new MapDto(user.employmentStatus, toEmploymentStatusText);
    this.createdAt = user.createdAt;

    if (user.role instanceof Role) {
      this.role = new ProfileRoleResponseDto(user.role);
    }

    if (user.team instanceof Team) {
      this.team = new ProfileTeamResponseDto(user.team);
    }
  }
}
