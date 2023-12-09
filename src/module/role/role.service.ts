import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  AlreadyExistRoleException,
  ListDto,
  NotFoundRoleException,
  RolePolicyQuery,
  RoleQuery,
  UserQuery,
  extractAppendOrRemoveTarget,
} from '@server/common';

import { RoleCreateBodyDto, RoleListQueryDto, RoleParamDto, RoleUpdateBodyDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private readonly dataSource: DataSource) {}

  async getRoles(query: RoleListQueryDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    return new ListDto(query, await roleQuery.findRoleList(query));
  }

  async createRole(body: RoleCreateBodyDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    const hasName = await roleQuery.hasRoleByName(body.name);

    if (hasName) {
      throw new AlreadyExistRoleException();
    }

    await this.dataSource.transaction(async (em) => {
      const roleQuery = new RoleQuery(em);
      const rolePolicyQuery = new RolePolicyQuery(em);

      const role = await roleQuery.createRole(body.name);
      await rolePolicyQuery.insertRolePolicy(role, body.rolePolicy);

      if (Array.isArray(body.users)) {
        const target = extractAppendOrRemoveTarget(body.users);
        const userQuery = new UserQuery(em);

        if (target.appends.length > 0) {
          await userQuery.updateUsers(target.appends, { role: { id: role.id } });
        }
      }
    });
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
        const target = extractAppendOrRemoveTarget(body.users);
        const userQuery = new UserQuery(em);

        if (target.appends.length > 0) {
          await userQuery.updateUsers(target.appends, { role: { id: param.id } });
        }

        if (target.removes.length > 0) {
          await userQuery.updateUsers(target.removes, { role: null });
        }
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
