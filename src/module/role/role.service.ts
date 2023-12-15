import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  AlreadyExistRoleException,
  ListDto,
  NotFoundRoleException,
  RolePolicyQuery,
  RoleQuery,
  UserQuery,
} from '@server/common';

import {
  RoleCreateBodyDto,
  RoleDto,
  RoleListQueryDto,
  RoleParamDto,
  RoleUpdateBodyDto,
  RoleUpdateUsersBodyDto,
} from './dto';
import { Role } from '@entity';

@Injectable()
export class RoleService {
  constructor(private readonly dataSource: DataSource) {}

  async getRoles(query: RoleListQueryDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    return new ListDto(query, await roleQuery.findRoleList(query), RoleDto);
  }

  async createRole(body: RoleCreateBodyDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    const hasName = await roleQuery.hasRoleByName(body.name);

    if (hasName) {
      throw new AlreadyExistRoleException();
    }

    const roleId = await this.dataSource.transaction(async (em) => {
      const roleQuery = new RoleQuery(em);
      const rolePolicyQuery = new RolePolicyQuery(em);

      const insert = await roleQuery.insertRole(body.name);
      await rolePolicyQuery.insertRolePolicy(insert.raw.insertId, body.rolePolicy);

      return insert.identifiers[0]?.id;
    });

    if (roleId == null) {
      throw new NotFoundRoleException();
    }

    const role = await roleQuery.findRoleById(roleId);

    if (role == null) {
      throw new NotFoundRoleException();
    }

    return new RoleDto(role);
  }

  async updateRole(param: RoleParamDto, body: RoleUpdateBodyDto) {
    const roleQuery = new RoleQuery(this.dataSource);

    const role = await roleQuery.findRoleById(param.id);

    if (role == null) {
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
        role.name = body.name;

        const roleQuery = new RoleQuery(em);
        await roleQuery.updateRole(param.id, { name: body.name });
      }

      if (body.rolePolicy) {
        role.policy = { ...role.policy, ...body.rolePolicy };

        const rolePolicyQuery = new RolePolicyQuery(em);
        await rolePolicyQuery.updateRolePolicy(param.id, body.rolePolicy);
      }
    });

    return new RoleDto(role);
  }

  async updateRoleUsers(param: RoleParamDto, body: RoleUpdateUsersBodyDto) {
    const roleQuery = new RoleQuery(this.dataSource);
    const role = await roleQuery.findRoleById(param.id);

    if (role == null) {
      throw new NotFoundRoleException();
    }

    const roleIds = await this.dataSource.transaction(async (em) => {
      const roleIds = [param.id];

      const userQuery = new UserQuery(em);
      await userQuery.deleteUsersRole(param.id);

      if (body.users.length === 0) {
        return roleIds;
      }

      const userIds = body.users.map(({ id }) => id);
      const users = await userQuery.findUsersInIdsByHasRole(userIds);
      await userQuery.updateUsers(userIds, { role: { id: param.id } });

      return roleIds.concat(users.map(({ role }) => (role as Role).id));
    });

    const roles = await roleQuery.findRoleInIdsWithUsers(roleIds);

    return roles.map((role) => new RoleDto(role));
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
