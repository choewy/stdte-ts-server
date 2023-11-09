import { ApiResponseProperty } from '@nestjs/swagger';

import {
  AuthStatusText,
  AuthStatusValue,
  DegreeText,
  DegreeValue,
  EmploymentStatusText,
  EmploymentStatusValue,
  ProjectScopeText,
  ProjectScopeValue,
  ProjectStatusText,
  ProjectStatusValue,
  RolePolicyScopeText,
  RolePolicyScopeValue,
} from './enums';

import {
  authStatusToTextMap,
  authStatusToValueMap,
  degreeToTextMap,
  degreeToValueMap,
  employmentStatusToTextMap,
  employmentStatusToValueMap,
  falseValues,
  projectScopeToTextMap,
  projectScopeToValueMap,
  projectStatusToTextMap,
  projectStatusToValueMap,
  rolePolicyScopeToTextMap,
  rolePolicyScopeToValueMap,
  trueValues,
} from './constants';
import { Type } from '@nestjs/common';

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
  if (trueValues.includes(value)) {
    return true;
  }

  if (falseValues.includes(value)) {
    return false;
  }

  return defaultReturnValue;
};

export const toDegreeText = (value: DegreeValue) => degreeToTextMap[value];
export const toDegreeValue = (value: DegreeText) => degreeToValueMap[value];

export const toAuthStatusText = (value: AuthStatusValue) => authStatusToTextMap[value];
export const toAuthStatusValue = (value: AuthStatusText) => authStatusToValueMap[value];

export const toEmploymentStatusText = (value: EmploymentStatusValue) => employmentStatusToTextMap[value];
export const toEmploymentStatusValue = (value: EmploymentStatusText) => employmentStatusToValueMap[value];

export const toProjectScopeText = (value: ProjectScopeValue) => projectScopeToTextMap[value];
export const toProjectScopesValue = (value: ProjectScopeText) => projectScopeToValueMap[value];

export const toProjectStatusText = (value: ProjectStatusValue) => projectStatusToTextMap[value];
export const toProjectStatusValue = (value: ProjectStatusText) => projectStatusToValueMap[value];

export const toRolePolicyText = (value: RolePolicyScopeValue) => rolePolicyScopeToTextMap[value];
export const toRolePolicyValue = (value: RolePolicyScopeText) => rolePolicyScopeToValueMap[value];

export const MapResponseType = <Enum1, Enum2>(enum1: Enum1, enum2: Enum2, transform: (value: Enum1) => Enum2) => {
  const enum1Values = toEnumValues(enum1, Number);
  const enum2Values = toEnumValues(enum2, String);

  class MapType {
    @ApiResponseProperty({
      type: String,
      enum: enum1,
      example: enum1Values.join(' | '),
    })
    value: Enum1;

    @ApiResponseProperty({
      type: String,
      enum: enum2,
      example: enum2Values.join(' | '),
    })
    transform: Enum2;

    constructor(value: unknown) {
      this.value = value as Enum1;
      this.transform = transform(value as Enum1);
    }
  }

  return MapType;
};

export const ListResponseType = <D, Q>(Row: Type<D>, query: Type<Q>) => {
  class ListType {
    @ApiResponseProperty({ type: Number })
    total: number;

    @ApiResponseProperty({ type: [Row] })
    rows: D[];

    @ApiResponseProperty({ type: query })
    query: Q;

    constructor(total: number, rows: D[], query: Q) {
      this.total = total;
      this.rows = rows;
      this.query = query;
    }
  }

  return ListType;
};
