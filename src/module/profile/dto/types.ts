import { User } from '@entity';

export type ProfileProperty = Pick<
  User,
  | 'name'
  | 'phone'
  | 'birthday'
  | 'genderCode'
  | 'scienceCode'
  | 'degree'
  | 'school'
  | 'major'
  | 'carType'
  | 'carNumber'
  | 'enteringDay'
  | 'resignationDay'
  | 'status'
>;
