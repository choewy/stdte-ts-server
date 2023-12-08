import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import {
  AlreadyExistRoleException,
  ListDto,
  NotFoundRoleException,
  ResponseDto,
  RolePolicyQuery,
  RoleQuery,
  UserQuery,
} from '@server/common';

import { CreateRoleBodyDto, RoleListQueryDto, RoleParamDto, UpdateRoleBodyDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private readonly dataSource: DataSource) {}

  async getRoles(query: RoleListQueryDto) {
    return new ResponseDto(
      new ListDto(query, await new RoleQuery(this.dataSource).findRolesAndUserCountAsList(query.skip, query.take)),
    );
  }

  async createRole(body: CreateRoleBodyDto) {
    const has = await new RoleQuery(this.dataSource).hasRoleByName(body.name);

    if (has) {
      throw new AlreadyExistRoleException();
    }

    await this.dataSource.transaction(async (em) =>
      new RolePolicyQuery(em).insertRolePolicy({
        role: await new RoleQuery(em).saveRole({ name: body.name }),
        accessCredentials: body.accessCredentials,
        accessRole: body.accessRole,
        accessUser: body.accessUser,
        accessProject: body.accessProject,
      }),
    );

    return new ResponseDto();
  }

  async updateRole(param: RoleParamDto, body: UpdateRoleBodyDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    const has = await roleQuery.hasRoleById(param.id);

    if (has === false) {
      throw new NotFoundRoleException();
    }

    if (typeof body.name === 'string') {
      if (await roleQuery.hasRoleByNameOmitId(param.id, body.name)) {
        throw new AlreadyExistRoleException();
      }
    }

    await this.dataSource.transaction(async (em) => {
      if (typeof body.name === 'string') {
        await new RoleQuery(em).updateRoleName(param.id, body.name);
      }

      if (
        typeof body.accessCredentials === 'boolean' ||
        typeof body.accessRole === 'boolean' ||
        typeof body.accessUser === 'boolean' ||
        typeof body.accessProject === 'boolean'
      ) {
        await new RolePolicyQuery(em).updateRolePolicy(param.id, {
          accessCredentials: body.accessCredentials,
          accessRole: body.accessRole,
          accessUser: body.accessUser,
          accessProject: body.accessProject,
        });
      }

      if (Array.isArray(body.users)) {
        const userQuery = new UserQuery(em);
        await userQuery.deleteUsersRole(param.id);
        await userQuery.updateUsersRoleInUserIds(param.id, body.users);
      }
    });

    return new ResponseDto();
  }

  async deleteRole(param: RoleParamDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    const has = await roleQuery.hasRoleById(param.id);

    if (has === false) {
      throw new NotFoundRoleException();
    }

    await roleQuery.deleteRole(param.id);

    return new ResponseDto();
  }
}
