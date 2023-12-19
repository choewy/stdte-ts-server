import { Project, ProjectStatus } from '@entity';

import { DateTimeFormat, toDateFormat } from '@server/common';

/** @todo 양식 수정 필요 */
export class ProjectXlsxRowDto {
  ID: number;
  사업코드: string;
  사업명: string;
  난이도: number;
  산업분야: string;
  사업구분: string;
  고객사: string;
  규모: number;
  상태: string;
  비고: string;
  시작일자: string;
  종료일자: string;
  'PO(대외)': string;
  'PM(대외)': string;
  'PL(대외)': string;
  'PO(대내)': string;
  'PM(대내)': string;
  'PL(대내)': string;

  constructor(project: Project) {
    this.ID = project.id;
    this.사업코드 = project.code;
    this.사업명 = project.name;
    this.난이도 = Number(project.difficulty);
    this.산업분야 = project.industryCategory?.name ?? '';
    this.사업구분 = project.businessCategory?.name ?? '';
    this.고객사 = project.customer?.alias ?? '';
    this.규모 = Number(project.amount);

    switch (project.status) {
      case ProjectStatus.Wating:
        this.상태 = '수주';
        break;

      case ProjectStatus.Active:
        this.상태 = '진행';
        break;

      case ProjectStatus.Complete:
        this.상태 = '준공';
        break;

      case ProjectStatus.AfterService:
        this.상태 = 'A/S';
        break;

      case ProjectStatus.LeavingOut:
        this.상태 = '탈락';
        break;
    }

    this.비고 = project.description ?? '';
    this.시작일자 = toDateFormat(DateTimeFormat.YYYY_MM_DD, project.startDate) ?? '';
    this.종료일자 = toDateFormat(DateTimeFormat.YYYY_MM_DD, project.endDate) ?? '';
    this['PO(대외)'] = project.externalOwners.map(({ user }) => user.name).join(', ');
    this['PM(대외)'] = project.externalManagers.map(({ user }) => user.name).join(', ');
    this['PL(대외)'] = project.externalLeaders.map(({ user }) => user.name).join(', ');
    this['PO(대내)'] = project.internalOwners.map(({ user }) => user.name).join(', ');
    this['PM(대내)'] = project.internalOwners.map(({ user }) => user.name).join(', ');
    this['PL(대내)'] = project.internalOwners.map(({ user }) => user.name).join(', ');
  }
}
