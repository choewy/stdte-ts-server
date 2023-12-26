import { DateTime } from 'luxon';

import { SetMetadata, Type, applyDecorators } from '@nestjs/common';

import { RolePolicyProperty } from '@entity';

import { MetadataKey } from './enums';
import { plainToInstance } from 'class-transformer';

export const SetRolePolicy = (value: Partial<RolePolicyProperty>, nullable: boolean = false) =>
  applyDecorators(SetMetadata(MetadataKey.RolePolicy, value), SetMetadata(MetadataKey.RoleNullable, nullable));

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

export const toSQLWithYear = (key: 's' | 'e', date?: Date | string | null) => {
  if (date == null) {
    return date;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  const datetime = DateTime.fromJSDate(date);

  if (datetime.isValid === false) {
    return null;
  }

  if (key === 's') {
    return datetime.startOf('year').toSQLDate();
  } else {
    return datetime.endOf('year').toSQLDate();
  }
};

export const toEntity = <E extends { id: number }>(Entity: Type<E>, value?: number | null) => {
  if (value == null) {
    return value;
  }

  if (value == 0) {
    return null;
  }

  return plainToInstance(Entity, { id: value });
};

export const toEntities = <E extends { id: number }>(Entity: Type<E>, value?: number[]) => {
  if (value == null) {
    return [];
  }

  const entities: E[] = [];

  for (const id of value) {
    if (id == null) {
      continue;
    }

    if (id < 1) {
      continue;
    }

    entities.push(plainToInstance(Entity, { id }));
  }

  return entities;
};

export const toStr = (value?: number | null | string | undefined) => {
  if (value == null) {
    return value;
  }

  return String(value);
};
