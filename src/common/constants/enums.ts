export enum MetadataKey {
  SetIgnoreException = 'ignore-exception',
}

export enum TypeOrmConnection {
  Writer = 'writer',
  Reader = 'reader',
}

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

export enum NodeEnv {
  Local = 'local',
  Develop = 'develop',
  Production = 'production',
}

export enum CookieKey {
  Access = '__atk',
  Refresh = '__rtk',
}

export enum GenderCode {
  Male1 = 1,
  Male2 = 3,
  Female1 = 2,
  Female2 = 4,
}

export enum Degree {
  Null = 'null',
  HighSchool = 'high-school',
  Bachelor2Years = 'bachelor-2-years',
  Bachelor4Years = 'bachelor-4-years',
  Master = 'master',
  Doctor = 'doctor',
}

export enum AuthStatus {
  Wating = 'wating',
  Reject = 'reject',
  Active = 'active',
  Disable = 'disable',
}

export enum EmploymentStatus {
  Wating = 'wating',
  Active = 'active',
  Vacate = 'vacate',
  Retire = 'retire',
}

export enum ProjectScope {
  Public = 'public',
  Team = 'team',
}

export enum ProjectStatus {
  Wating = 'wating',
  Active = 'active',
  Pause = 'pause',
  Cancel = 'cancel',
  Finish = 'finish',
  AfterService = 'a/s',
}

export enum RolePolicyScope {
  Limit = 1,
  Read = 2,
  Write = 3,
  Update = 4,
  Delete = 5,
  Entire = 6,
  Admin = 7,
  Developer = 8,
}
