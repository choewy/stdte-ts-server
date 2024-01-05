import ExcelJS from 'exceljs';

import { Degree, Role, RolePolicyLevel, User, UserStatus } from '@entity';
import { replaceCharacters } from '@server/common';

export class UserExcelService {
  private readonly WORKSHEET_OPTIONS: Partial<ExcelJS.AddWorksheetOptions> = {
    views: [{ state: 'frozen', xSplit: 2, ySplit: 2 }],
  };

  private POLICY_LEVEL: Record<RolePolicyLevel, string> = {
    [RolePolicyLevel.Limit]: '제한',
    [RolePolicyLevel.Read]: '조회',
    [RolePolicyLevel.Create]: '생성',
    [RolePolicyLevel.Update]: '수정',
    [RolePolicyLevel.Delete]: '삭제',
    [RolePolicyLevel.Admin]: '관리자',
    [RolePolicyLevel.Developer]: '개발자',
  };

  private DEGREE: Record<Degree, string> = {
    [Degree.HighSchool]: '고졸',
    [Degree.Bachelor2Years]: '전문학사',
    [Degree.Bachelor4Years]: '학사',
    [Degree.Master]: '석사',
    [Degree.Doctor]: '박사',
  };

  private STATUS: Record<UserStatus, string> = {
    [UserStatus.Active]: '재직',
    [UserStatus.Vacate]: '휴직',
    [UserStatus.Retire]: '퇴직',
    [UserStatus.Reference]: '참조',
  };

  createRoleSheet(wb: ExcelJS.Workbook, sheetName: string, roles: Role[]) {
    const ws = wb.addWorksheet(replaceCharacters(sheetName));

    const rows: Array<string | number>[] = [
      ['', '역할명', '권한', ...new Array(8)],
      [
        'PK',
        '',
        '계정',
        '역할 및 정책',
        '설정',
        '구성원',
        '프로젝트',
        '고객사',
        '사업구분',
        '산업분야',
        '수행업무구분',
      ],
    ];

    for (const role of roles) {
      rows.push([
        role.id,
        role.name,
        this.POLICY_LEVEL[role.policy.credentials],
        this.POLICY_LEVEL[role.policy.roleAndPolicy],
        this.POLICY_LEVEL[role.policy.setting],
        this.POLICY_LEVEL[role.policy.user],
        this.POLICY_LEVEL[role.policy.project],
        this.POLICY_LEVEL[role.policy.customer],
        this.POLICY_LEVEL[role.policy.businessCategory],
        this.POLICY_LEVEL[role.policy.industryCategory],
        this.POLICY_LEVEL[role.policy.taskCategory],
      ]);
    }

    ws.insertRows(1, rows);

    for (let r = 1; r <= rows.length; r++) {
      ws.getRow(r).alignment = { vertical: 'middle', horizontal: 'center' };
      ws.getRow(r).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    }

    ws.getColumn(1).hidden = true;
    ws.getColumn(4).width = 20;
    ws.getColumn(11).width = 20;

    ws.mergeCells(1, 2, 2, 2);
    ws.mergeCells(1, 3, 1, 11);

    ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getRow(2).alignment = { vertical: 'middle', horizontal: 'center' };

    return ws;
  }

  createUserSheet(wb: ExcelJS.Workbook, sheetName: string, users: User[]) {
    const ws = wb.addWorksheet(replaceCharacters(sheetName), this.WORKSHEET_OPTIONS);

    const rows: Array<string | number | Date>[] = [
      ['', '인적사항', '', '', '', '계정정보', '', '', '', '', '학력사항', '', '', '차량정보', ''],
      [
        'PK',
        '이름',
        '생년월일',
        '연락처',
        '과학기술인등록번호',
        '이메일',
        '역할',
        '재직상태',
        '입사일자',
        '퇴사일자',
        '최종학력',
        '출신학교',
        '전공학과',
        '차종',
        '차량번호',
      ],
    ];

    for (const user of users) {
      rows.push([
        user.id,
        user.name,
        user.birthday ? new Date(user.birthday) : '',
        user.phone ?? '',
        user.scienceNumber ?? '',
        user.credentials.email,
        user.role?.name ?? '',
        this.STATUS[user.status],
        user.enteringDay ? new Date(user.enteringDay) : '',
        user.resignationDay ? new Date(user.resignationDay) : '',
        user.degree === null ? '' : this.DEGREE[user.degree],
        user.school ?? '',
        user.major ?? '',
        user.carType ?? '',
        user.carNumber ?? '',
      ]);
    }

    ws.insertRows(1, rows);

    for (let r = 1; r <= rows.length; r++) {
      ws.getRow(r).alignment = { vertical: 'middle', horizontal: 'center' };
      ws.getRow(r).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    }

    ws.mergeCells(1, 2, 1, 5);
    ws.mergeCells(1, 6, 1, 10);
    ws.mergeCells(1, 11, 1, 13);
    ws.mergeCells(1, 14, 1, 15);
    ws.getColumn(6).width = 30;

    for (const c of [3, 5, 9, 10]) {
      ws.getColumn(c).width = 15;

      if (c === 5) {
        continue;
      }

      ws.getColumn(c).numFmt = 'yyyy-mm-dd';
    }

    for (const c of [4, 12, 13, 14, 15]) {
      ws.getColumn(c).width = 20;
    }

    ws.getColumn(1).hidden = true;
    ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getRow(2).alignment = { vertical: 'middle', horizontal: 'center' };

    return ws;
  }
}
