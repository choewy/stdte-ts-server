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
