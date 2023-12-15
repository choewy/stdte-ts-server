import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  AlreadyExistRoleException,
  InsertDto,
  ListDto,
  NotFoundRoleException,
  RolePolicyQuery,
  RoleQuery,
  UserQuery,
} from '@server/common';

import { RoleCreateBodyDto, RoleDto, RoleListQueryDto, RoleParamDto, RoleUpdateBodyDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private readonly dataSource: DataSource) {}

  async getRoles(query: RoleListQueryDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    return new ListDto(query, await roleQuery.findRoleList(query), RoleDto);
  }

  async getRole(param: RoleParamDto) {
    const roleQuery = new RoleQuery(this.dataSource);
    const role = await roleQuery.findRoleById(param.id);

    if (role == null) {
      throw new NotFoundRoleException();
    }

    return new RoleDto(role);
  }

  async createRole(body: RoleCreateBodyDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    const hasName = await roleQuery.hasRoleByName(body.name);

    if (hasName) {
      throw new AlreadyExistRoleException();
    }

    const insert = await this.dataSource.transaction(async (em) => {
      const roleQuery = new RoleQuery(em);
      const rolePolicyQuery = new RolePolicyQuery(em);

      const insert = await roleQuery.insertRole(body.name);
      await rolePolicyQuery.insertRolePolicy(insert.raw.insertId, body.rolePolicy);

      return insert;
    });

    return new InsertDto(insert);
  }

  async updateRole(param: RoleParamDto, body: RoleUpdateBodyDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    const hasRole = await roleQuery.hasRoleById(param.id);

    if (hasRole === false) {
      throw new NotFoundRoleException();
    }

    if (body.name) {
      const hasName = await roleQuery.hasRoleByNameOmitId(param.id, body.name);

      if (hasName) {
        throw new AlreadyExistRoleException();
      }
    }

    await this.dataSource.transaction(async (em) => {
      if (body.name) {
        const roleQuery = new RoleQuery(em);
        await roleQuery.updateRole(param.id, { name: body.name });
      }

      if (body.rolePolicy) {
        const rolePolicyQuery = new RolePolicyQuery(em);
        await rolePolicyQuery.updateRolePolicy(param.id, body.rolePolicy);
      }

      if (Array.isArray(body.users)) {
        const userQuery = new UserQuery(em);
        await userQuery.deleteUsersRole(param.id);

        if (body.users.length === 0) {
          return;
        }

        await userQuery.updateUsers(
          body.users.map(({ id }) => id),
          { role: { id: param.id } },
        );
      }
    });
  }

  async deleteRole(param: RoleParamDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    const hasRole = await roleQuery.hasRoleById(param.id);

    if (hasRole === false) {
      throw new NotFoundRoleException();
    }

    await roleQuery.deleteRole(param.id);
  }
}
