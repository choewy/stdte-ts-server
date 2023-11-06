import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  AlreadyExistRoleNameException,
  CannotDeleteYourRoleException,
  CannotUpdateYourRoleException,
  InjectReaderDataSource,
  InjectWriterDataSource,
  ListQueryDto,
  ListResponseDto,
  NotFoundRoleException,
  Role,
  RoleQuery,
} from '@server/common';

import { CreateRoleBodyDto, RoleResponseDto, UpdateRoleBodyDto } from './dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectWriterDataSource()
    private readonly writerDataSource: DataSource,
    @InjectReaderDataSource()
    private readonly readerDataSource: DataSource,
  ) {}

  async getRoleList(query: ListQueryDto): Promise<ListResponseDto<RoleResponseDto, ListQueryDto>> {
    const [rows, total] = await RoleQuery.of(this.readerDataSource).findRolesAndCount(query.skip, query.take);

    return new ListResponseDto(
      total,
      rows.map((row) => new RoleResponseDto(row)),
      query,
    );
  }

  async createRole(body: CreateRoleBodyDto): Promise<void> {
    const roleExist = await RoleQuery.of(this.readerDataSource).hasRoleByName(body.name);

    if (roleExist) {
      throw new AlreadyExistRoleNameException();
    }

    await RoleQuery.of(this.writerDataSource).createRole({
      name: body.name,
      rolePolicy: {
        accessRole: body.rolePolicy.accessRoleValue,
        accessTeam: body.rolePolicy.accessTeamValue,
        accessUser: body.rolePolicy.accessUserValue,
        accessProject: body.rolePolicy.accessProjectValue,
      },
    });
  }

  async updateRole(userRole: Role, updateRoleId: number, body: UpdateRoleBodyDto): Promise<void> {
    if (
      userRole.id === updateRoleId &&
      body.rolePolicy?.accessRoleValue &&
      userRole.rolePolicy.accessRole > body.rolePolicy.accessRoleValue
    ) {
      throw new CannotUpdateYourRoleException();
    }

    const { affected } = await RoleQuery.of(this.writerDataSource).updateRole(updateRoleId, {
      name: body.name,
      rolePolicy: {
        accessRole: body.rolePolicy?.accessRoleValue,
        accessTeam: body.rolePolicy?.accessTeamValue,
        accessUser: body.rolePolicy?.accessUserValue,
        accessProject: body.rolePolicy?.accessProjectValue,
      },
    });

    if (affected === 0) {
      throw new NotFoundRoleException();
    }
  }

  async deleteRole(userRoleId: number, deleteRoleId: number): Promise<void> {
    if (userRoleId === deleteRoleId) {
      throw new CannotDeleteYourRoleException();
    }

    const { affected } = await RoleQuery.of(this.writerDataSource).deleteRole(deleteRoleId);

    if (affected === 0) {
      throw new NotFoundRoleException();
    }
  }
}
