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

export const trueValues = ['true', true, '1', 1];
export const falseValues = ['false', false, '0', 0];

export const degreeToTextMap = {
  [DegreeValue.Null]: DegreeText.Null,
  [DegreeValue.HighSchool]: DegreeText.HighSchool,
  [DegreeValue.Bachelor2Years]: DegreeText.Bachelor2Years,
  [DegreeValue.Bachelor4Years]: DegreeText.Bachelor4Years,
  [DegreeValue.Master]: DegreeText.Master,
  [DegreeValue.Doctor]: DegreeText.Doctor,
};

export const degreeToValueMap = {
  [DegreeText.Null]: DegreeValue.Master,
  [DegreeText.HighSchool]: DegreeValue.HighSchool,
  [DegreeText.Bachelor2Years]: DegreeValue.Bachelor2Years,
  [DegreeText.Bachelor4Years]: DegreeValue.Bachelor4Years,
  [DegreeText.Master]: DegreeValue.Master,
  [DegreeText.Doctor]: DegreeValue.Doctor,
};

export const authStatusToTextMap = {
  [AuthStatusValue.Wating]: AuthStatusText.Wating,
  [AuthStatusValue.Active]: AuthStatusText.Active,
  [AuthStatusValue.Reject]: AuthStatusText.Reject,
};

export const authStatusToValueMap = {
  [AuthStatusText.Wating]: AuthStatusValue.Wating,
  [AuthStatusText.Active]: AuthStatusValue.Active,
  [AuthStatusText.Reject]: AuthStatusValue.Reject,
};

export const employmentStatusToTextMap = {
  [EmploymentStatusValue.Wating]: EmploymentStatusText.Wating,
  [EmploymentStatusValue.Active]: EmploymentStatusText.Active,
  [EmploymentStatusValue.Vacate]: EmploymentStatusText.Vacate,
  [EmploymentStatusValue.Retire]: EmploymentStatusText.Retire,
};

export const employmentStatusToValueMap = {
  [EmploymentStatusText.Wating]: EmploymentStatusValue.Wating,
  [EmploymentStatusText.Active]: EmploymentStatusValue.Active,
  [EmploymentStatusText.Vacate]: EmploymentStatusValue.Vacate,
  [EmploymentStatusText.Retire]: EmploymentStatusValue.Retire,
};

export const projectScopeToTextMap = {
  [ProjectScopeValue.Public]: ProjectScopeText.Public,
  [ProjectScopeValue.Team]: ProjectScopeText.Team,
};

export const projectScopeToValueMap = {
  [ProjectScopeText.Public]: ProjectScopeValue.Public,
  [ProjectScopeText.Team]: ProjectScopeValue.Team,
};

export const projectStatusToTextMap = {
  [ProjectStatusValue.Wating]: ProjectStatusText.Wating,
  [ProjectStatusValue.Active]: ProjectStatusText.Active,
  [ProjectStatusValue.Pause]: ProjectStatusText.Pause,
  [ProjectStatusValue.Cancel]: ProjectStatusText.Cancel,
  [ProjectStatusValue.Finish]: ProjectStatusText.Finish,
  [ProjectStatusValue.AfterService]: ProjectStatusText.AfterService,
};

export const projectStatusToValueMap = {
  [ProjectStatusText.Wating]: ProjectStatusValue.Wating,
  [ProjectStatusText.Active]: ProjectStatusValue.Active,
  [ProjectStatusText.Pause]: ProjectStatusValue.Pause,
  [ProjectStatusText.Cancel]: ProjectStatusValue.Cancel,
  [ProjectStatusText.Finish]: ProjectStatusValue.Finish,
  [ProjectStatusText.AfterService]: ProjectStatusValue.AfterService,
};

export const rolePolicyScopeToTextMap = {
  [RolePolicyScopeValue.Limit]: RolePolicyScopeText.Limit,
  [RolePolicyScopeValue.Read]: RolePolicyScopeText.Read,
  [RolePolicyScopeValue.Write]: RolePolicyScopeText.Write,
  [RolePolicyScopeValue.Update]: RolePolicyScopeText.Update,
  [RolePolicyScopeValue.Delete]: RolePolicyScopeText.Delete,
  [RolePolicyScopeValue.All]: RolePolicyScopeText.All,
};

export const rolePolicyScopeToValueMap = {
  [RolePolicyScopeText.Limit]: RolePolicyScopeValue.Limit,
  [RolePolicyScopeText.Read]: RolePolicyScopeValue.Read,
  [RolePolicyScopeText.Write]: RolePolicyScopeValue.Write,
  [RolePolicyScopeText.Update]: RolePolicyScopeValue.Update,
  [RolePolicyScopeText.Delete]: RolePolicyScopeValue.Delete,
  [RolePolicyScopeText.All]: RolePolicyScopeValue.All,
};
