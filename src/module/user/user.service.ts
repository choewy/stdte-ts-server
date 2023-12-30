import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { DownloadDto, DownloadFormat, ListDto, NotFoundUserException, RoleQuery, UserQuery } from '@server/common';

import { UserDto, UserListQueryDto, UserParamDto, UserUpdateBodyDto } from './dto';
import ExcelJS from 'exceljs';
import { UserExcelService } from './user-excel.service';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async getUsers(query: UserListQueryDto) {
    const userQuery = new UserQuery(this.dataSource);

    return new ListDto(query, await userQuery.findUserList(query), UserDto);
  }

  async createUsersFile() {
    const users = await new UserQuery(this.dataSource).findAll({ role: true });
    const roles = await new RoleQuery(this.dataSource).findAll({ policy: true });

    const wb = new ExcelJS.Workbook();
    const excelService = new UserExcelService();

    excelService.createUserSheet(wb, '구성원', users);
    excelService.createRoleSheet(wb, 'ref_역할', roles);

    return new DownloadDto((await wb.xlsx.writeBuffer()) as Buffer, DownloadFormat.Xlsx, '구성원 목록');
  }

  async getUser(id: number) {
    const userQuery = new UserQuery(this.dataSource);
    const user = await userQuery.findUserById(id, {
      credentials: true,
      role: { policy: true },
    });

    if (user == null) {
      throw new NotFoundUserException();
    }

    return new UserDto(user);
  }

  async existUser(param: UserParamDto) {
    const userQuery = new UserQuery(this.dataSource);
    const hasUser = await userQuery.hasUserById(param.id);

    if (hasUser === false) {
      throw new NotFoundUserException();
    }
  }

  async updateUser(id: number, body: UserUpdateBodyDto) {
    const userQuery = new UserQuery(this.dataSource);
    const hasUser = await userQuery.hasUserById(id);

    if (hasUser === false) {
      throw new NotFoundUserException();
    }

    await userQuery.updateUser(id, body);

    const user = await userQuery.findUserById(id, {
      credentials: true,
      role: { policy: true },
    });

    if (user == null) {
      throw new NotFoundUserException();
    }

    return new UserDto(user);
  }
}
