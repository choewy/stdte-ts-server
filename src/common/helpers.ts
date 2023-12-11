import { DateTime } from 'luxon';

import { SetMetadata, Type } from '@nestjs/common';

import { RolePolicyProperty } from '@entity';

import { MetadataKey } from './enums';
import { plainToInstance } from 'class-transformer';

export const SetRolePolicy = (value: Partial<RolePolicyProperty>) => SetMetadata(MetadataKey.RolePolicy, value);

export const toDateFormat = (format: string, date?: string | DateTime | Date | null) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (date instanceof Date) {
    date = DateTime.fromJSDate(date);
  }

  if (date instanceof DateTime) {
    if (date.isValid === false) {
      return null;
    }

    return date.toFormat(format);
  }

  return null;
};

export const toISOString = (date?: string | DateTime | Date | null) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (date instanceof Date) {
    date = DateTime.fromJSDate(date);
  }

  if (date instanceof DateTime) {
    if (date.isValid === false) {
      return null;
    }

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

export const toSQLDate = (date?: Date | string | null) => {
  if (date == null) {
    return date;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  const datetime = DateTime.fromJSDate(date);

  if (datetime.isValid) {
    return datetime.toSQLDate();
  } else {
    return null;
  }
};

export const toEntity = <E extends { id: number }>(Entity: Type<E>, value?: number | null) => {
  if (value == null) {
    return value;
  }

  return plainToInstance(Entity, { id: value });
};

export const toEntities = <E extends { id: number }>(Entity: Type<E>, value?: number[]) => {
  if (value == null) {
    return [];
  }

  return value.map((id) => plainToInstance(Entity, { id }));
};

export const toStr = (value?: number | null | string | undefined) => {
  if (value == null) {
    return value;
  }

  return String(value);
};
