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

import { CreateRoleBodyDto, RoleListQueryDto, RoleParamDto, UpdateRoleBodyDto, UpdateRoleUsersBodyDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private readonly dataSource: DataSource) {}

  async getRoles(query: RoleListQueryDto) {
    return new ResponseDto(
      new ListDto(query, await new RoleQuery(this.dataSource).findRolesAndUserCountAsList(query.take, query.skip)),
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
        accessRoleLevel: body.accessRoleLevel,
        accessTeamLevel: body.accessTeamLevel,
        accessUserLevel: body.accessUserLevel,
        accessProjectLevel: body.accessProjectLevel,
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
      await new RoleQuery(em).updateRoleName(param.id, body.name);
      await new RolePolicyQuery(em).updateRolePolicy(param.id, {
        accessRoleLevel: body.accessRoleLevel,
        accessTeamLevel: body.accessTeamLevel,
        accessUserLevel: body.accessUserLevel,
        accessProjectLevel: body.accessProjectLevel,
      });
    });

    return new ResponseDto();
  }

  async updateRoleUsers(param: RoleParamDto, body: UpdateRoleUsersBodyDto) {
    const has = await new RoleQuery(this.dataSource).hasRoleById(param.id);

    if (has === false) {
      throw new NotFoundRoleException();
    }

    await this.dataSource.transaction(async (em) => {
      const userQuery = new UserQuery(em);
      await userQuery.deleteUsersRole(param.id);
      await userQuery.updateUsersRoleInUserIds(param.id, body.users);
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
