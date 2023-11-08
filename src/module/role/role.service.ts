import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  AlreadyExistRoleNameException,
  CannotDeleteYourRoleException,
  CannotUpdateYourRoleException,
  InjectReaderDataSource,
  InjectWriterDataSource,
  ListQueryDto,
  NotFoundRoleException,
  Role,
  RolePolicyQuery,
  RoleQuery,
  User,
  UserQuery,
} from '@server/common';

import { CreateRoleBodyDto, RoleListResponseDto, RoleResponseDto, UpdateRoleBodyDto } from './dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectWriterDataSource()
    private readonly writerDataSource: DataSource,
    @InjectReaderDataSource()
    private readonly readerDataSource: DataSource,
  ) {}

  async getRoleList(query: ListQueryDto): Promise<RoleListResponseDto> {
    const [rows, total] = await RoleQuery.of(this.readerDataSource).findRolesAndCount(query.skip, query.take);

    return new RoleListResponseDto(
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

    let users: User[] = [];

    if (body.users.length > 0) {
      users = await UserQuery.of(this.readerDataSource).findUserIdInIds(body.users);
    }

    await RoleQuery.of(this.writerDataSource).saveRole({
      name: body.name,
      rolePolicy: {
        accessRole: body.rolePolicy.accessRoleValue,
        accessTeam: body.rolePolicy.accessTeamValue,
        accessUser: body.rolePolicy.accessUserValue,
        accessProject: body.rolePolicy.accessProjectValue,
      },
      users,
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

    const roleExist = await RoleQuery.of(this.readerDataSource).hasRoleById(updateRoleId);

    if (!roleExist) {
      throw new NotFoundRoleException();
    }

    let users: User[] = [];

    if (body.users.length > 0) {
      users = await UserQuery.of(this.readerDataSource).findUserIdInIds(body.users);
    }

    await this.writerDataSource.transaction<void>(async (em) => {
      if (body.name) {
        await RoleQuery.of(em).updateRole(updateRoleId, {
          name: body.name,
        });
      }

      if (body.rolePolicy) {
        await RolePolicyQuery.of(em).updateRolePolicy(updateRoleId, {
          accessRole: body.rolePolicy.accessRoleValue,
          accessTeam: body.rolePolicy.accessTeamValue,
          accessUser: body.rolePolicy.accessUserValue,
          accessProject: body.rolePolicy.accessProjectValue,
        });
      }

      if (users.length > 0) {
        await UserQuery.of(em).updateUser(
          users.map(({ id }) => id),
          { role: { id: updateRoleId } },
        );
      }
    });
  }

  async deleteRole(userRoleId: number, deleteRoleId: number): Promise<void> {
    if (userRoleId === deleteRoleId) {
      throw new CannotDeleteYourRoleException();
    }

    const roleExist = await RoleQuery.of(this.readerDataSource).hasRoleById(deleteRoleId);

    if (!roleExist) {
      throw new NotFoundRoleException();
    }

    await RoleQuery.of(this.writerDataSource).deleteRole(deleteRoleId);
  }
}
