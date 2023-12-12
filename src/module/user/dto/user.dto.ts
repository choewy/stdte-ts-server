import { UserStatus, GenderCode, User, Degree } from '@entity';
import { DateTimeFormat, toDateFormat, toISOString } from '@server/common';

import { UserRoleDto } from './user-role.dto';

export class UserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: GenderCode | string;
  birthday: string;
  scienceNumber: string;
  degree: Degree | string;
  school: string;
  major: string;
  carType: string;
  carNumber: string;
  enteringDay: string;
  resignationDay: string;
  status: UserStatus;
  role: UserRoleDto | null;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.credentials.email;
    this.phone = user.phone ?? '';
    this.gender = user.gender ?? '';
    this.birthday = toDateFormat(DateTimeFormat.YYYY_MM_DD, user.birthday) ?? '';
    this.scienceNumber = user.scienceNumber ?? '';
    this.degree = user.degree ?? '';
    this.school = user.school ?? '';
    this.major = user.major ?? '';
    this.carType = user.carType ?? '';
    this.carNumber = user.carNumber ?? '';
    this.enteringDay = toDateFormat(DateTimeFormat.YYYY_MM_DD, user.enteringDay) ?? '';
    this.resignationDay = toDateFormat(DateTimeFormat.YYYY_MM_DD, user.resignationDay) ?? '';
    this.status = user.status;
    this.role = user.role ? new UserRoleDto(user.role) : null;
    this.createdAt = toISOString(user.createdAt);
    this.updatedAt = toISOString(user.updatedAt);
  }
}
