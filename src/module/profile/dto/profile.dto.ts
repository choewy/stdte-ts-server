import { Degree, EmploymentStatus, GenderCode, User } from '@entity';

import { ProfileProperty } from './types';

export class ProfileDto implements ProfileProperty {
  name: string;
  phone: string | null;
  birthday: Date | null;
  genderCode: GenderCode | null;
  scienceCode: string | null;
  degree: Degree | null;
  school: string | null;
  major: string | null;
  carType: string | null;
  carNumber: string | null;
  enteringDay: Date | null;
  resignationDay: Date | null;
  status: EmploymentStatus;

  constructor(user: User) {
    this.name = user.name;
    this.phone = user.phone;
    this.birthday = user.birthday;
    this.genderCode = user.genderCode;
    this.scienceCode = user.scienceCode;
    this.degree = user.degree;
    this.school = user.school;
    this.major = user.major;
    this.carType = user.carType;
    this.carNumber = user.carNumber;
    this.enteringDay = user.enteringDay;
    this.resignationDay = user.resignationDay;
    this.status = user.status;
  }
}
