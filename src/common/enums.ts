export enum NodeEnv {
  Local = 'local',
  Develop = 'develop',
  Product = 'product',
}

export enum DownloadFormat {
  Xlsx = 'xlsx',
  Json = 'json',
  Csv = 'csv',
}

export enum DownloadMimetype {
  Xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  Json = 'application/json',
  Csv = 'text/csv',
}

export enum MetadataKey {
  RolePolicy = 'role-policy',
}

export enum DateTimeFormat {
  YYYYMMDD = 'yyyyMMdd',
  YYYY_MM_DD = 'yyyy-MM-dd',
}

export enum TimeRecordEvent {
  Update = 'timerecord.update',
  Delete = 'timerecord.delete',
}

export enum TimeMemoEvent {
  Update = 'timememo.update',
  Delete = 'timememo.delete',
}

export enum TimeLogEvent {
  Update = 'timelog.update',
}
