import { AuthStatus, Degree, EmploymentStatus, ProjectScope, ProjectStatus, RolePolicyScope } from './enums';

export const TRUE_VALUES = ['true', true, '1', 1];

export const FALSE_VALUES = ['false', false, '0', 0];

export const DEGREE_TEXTS = {
  [Degree.Null]: '없음',
  [Degree.HighSchool]: '고졸',
  [Degree.Bachelor2Years]: '전문학사',
  [Degree.Bachelor4Years]: '일반학사',
  [Degree.Master]: '석사',
  [Degree.Doctor]: '박사',
};

export const AUTH_STATUS_TEXTS = {
  [AuthStatus.Wating]: '승인대기',
  [AuthStatus.Reject]: '승인거절',
  [AuthStatus.Active]: '활성',
  [AuthStatus.Disable]: '비활성',
};

export const EMPLOYMENT_STATUS_TEXTS = {
  [EmploymentStatus.Null]: '미지정',
  [EmploymentStatus.Active]: '재직',
  [EmploymentStatus.Vacate]: '휴직',
  [EmploymentStatus.Retire]: '퇴직',
};

export const PROJECT_SCOPE_TEXTS = {
  [ProjectScope.Public]: '전체 공개',
  [ProjectScope.Team]: '팀 공개',
};

export const PROJECT_STATUS_TEXTS = {
  [ProjectStatus.Wating]: '수주',
  [ProjectStatus.Active]: '진행',
  [ProjectStatus.Pause]: '중단',
  [ProjectStatus.Cancel]: '취소',
  [ProjectStatus.Finish]: '준공',
  [ProjectStatus.AfterService]: 'A/S',
};

export const ROLE_POLICY_SCOPE_TEXTS = {
  [RolePolicyScope.Limit]: '제한',
  [RolePolicyScope.Read]: '조회',
  [RolePolicyScope.Write]: '생성',
  [RolePolicyScope.Update]: '수정',
  [RolePolicyScope.Delete]: '삭제',
  [RolePolicyScope.Entire]: '전체',
  [RolePolicyScope.Developer]: '개발자',
  [RolePolicyScope.Admin]: '관리자',
};
