export enum MetadataKey {
  SetIgnoreException = 'ignore-exception',
}

export enum TypeOrmConnection {
  Writer = 'writer',
  Reader = 'reader',
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
  Null = 0,
  HighSchool = 1,
  Bachelor2Years = 2,
  Bachelor4Years = 3,
  Master = 4,
  Doctor = 5,
}

export enum AuthStatus {
  Wating = 0,
  Reject = 1,
  Active = 2,
  Disable = 3,
}

export enum EmploymentStatus {
  Null = 0,
  Active = 1,
  Vacate = 2,
  Retire = 3,
}

export enum ProjectScope {
  Public = 0,
  Team = 1,
}

export enum ProjectStatus {
  Wating = 0,
  Active = 1,
  Pause = 2,
  Cancel = 3,
  Finish = 4,
  AfterService = 5,
}

export enum RolePolicyScope {
  Limit = 0,
  Read = 1,
  Write = 2,
  Update = 3,
  Delete = 4,
  Entire = 5,
  Developer = 8,
  Admin = 9,
}
