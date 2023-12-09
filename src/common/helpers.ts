import { DateTime } from 'luxon';

import { SetMetadata } from '@nestjs/common';

import { RolePolicyProperty } from '@entity';

import { MetadataKey } from './enums';

export const SetRolePolicy = (value: Partial<RolePolicyProperty>) => SetMetadata(MetadataKey.RolePolicy, value);

export const toISO = (date?: string | DateTime | Date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (date instanceof Date) {
    date = DateTime.fromJSDate(date);
  }

  if (date instanceof DateTime) {
    return date.toISO({ includeOffset: false });
  }

  return null;
};

export const toTrim = (value?: string | null) => {
  if (value == null) {
    return value;
  }

  return value.trim();
};

export const toEmptyNull = (value?: string | null) => {
  if (value == null) {
    return value;
  }

  if (value === '') {
    return null;
  }

  return value;
};

export const toDate = (date?: Date | string | null) => {
  if (date == null) {
    return date;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  const datetime = DateTime.fromJSDate(date);

  if (datetime.isValid) {
    return datetime.toJSDate();
  } else {
    return null;
  }
};
