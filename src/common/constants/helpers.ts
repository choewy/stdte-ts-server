import { EnumType } from './types';
import { FALSE_VALUES, TRUE_VALUES } from './constants';

export const toBoolean = (value: string | number | boolean, defaultReturnValue = null) => {
  if (TRUE_VALUES.includes(value)) {
    return true;
  }

  if (FALSE_VALUES.includes(value)) {
    return false;
  }

  return defaultReturnValue;
};

export const getEnumValuesOnlyString = (e: EnumType): string[] => {
  return Object.values(e).filter((v) => typeof v === 'string') as string[];
};

export const getEnumValuesOnlyNumber = (e: EnumType): number[] => {
  return Object.values(e).filter((v) => typeof v === 'number') as number[];
};
