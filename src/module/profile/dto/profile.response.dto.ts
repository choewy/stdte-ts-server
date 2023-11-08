import {
  AuthStatusMapResponseDto,
  DegreeMapResponseDto,
  EmploymentStatusMapResponseDto,
  GenderCode,
  Role,
  Team,
  User,
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
  public readonly degree: DegreeMapResponseDto;
  public readonly school: string | null;
  public readonly major: string | null;
  public readonly carType: string | null;
  public readonly carNumber: string | null;
  public readonly authStatus: AuthStatusMapResponseDto;
  public readonly employmentStatus: EmploymentStatusMapResponseDto;
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
