import { FALSE_VALUES, TRUE_VALUES } from './constants';

export const toEnumKeys = <E>(e: E, type?: StringConstructor | NumberConstructor) => {
  const keys = Object.keys(e) as Array<string | number>;

  switch (type?.name) {
    case String.name:
      return keys.filter((key) => typeof key === 'string') as Array<string>;

    case Number.name:
      return keys.filter((key) => typeof key === 'number') as Array<number>;

    default:
      return keys;
  }
};

export const toEnumValues = <E>(e: E, type?: StringConstructor | NumberConstructor) => {
  const values = Object.values(e) as Array<number | string>;

  switch (type?.name) {
    case String.name:
      return values.filter((value) => typeof value === 'string') as Array<string>;

    case Number.name:
      return values.filter((value) => typeof value === 'number') as Array<number>;

    default:
      return values;
  }
};

export const toBoolean = (value: string | number | boolean, defaultReturnValue = null) => {
  if (TRUE_VALUES.includes(value)) {
    return true;
  }

  if (FALSE_VALUES.includes(value)) {
    return false;
  }

  return defaultReturnValue;
};
