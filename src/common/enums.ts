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
  RoleNullable = 'role-nullable',
}

export enum DateTimeFormat {
  YYYYMMDD = 'yyyyMMdd',
  YYYY_MM_DD = 'yyyy-MM-dd',
}

export enum TimeRecordEvent {
  Upsert = 'timerecord.upsert',
}

export enum TimeMemoEvent {
  Upsert = 'timememo.upsert',
  Delete = 'timememo.delete',
}

export enum TimeLogEvent {
  Update = 'timelog.update',
}

export enum SlackEvent {
  Webhook = 'slack.webhook',
}
