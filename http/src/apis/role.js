import { api } from '../core/axios.js';

export class Role {
  static async getRoles() {
    await api('/roles', {
      method: 'get',
      params: {
        take: 10,
        skip: 0,
      },
    });
  }

  static async createRole() {
    await api('/roles', {
      method: 'post',
      data: {
        name: 'test',
        accessRoleLevel: 0,
      },
    });
  }

  static async updateRoleName(id) {
    await api(`/roles/${id}`, {
      method: 'patch',
      data: { name: 'test' },
    });
  }

  static async updateRolePolicy(id) {
    await api(`/roles/${id}`, {
      method: 'patch',
      data: { accessRoleLevel: 2, accessTeamLevel: 2 },
    });
  }

  static async updateRole(id) {
    await api(`/roles/${id}`, {
      method: 'patch',
      data: { name: 'test', accessRoleLevel: 2, accessTeamLevel: 2 },
    });
  }

  static async updateRoleUsers(id, users) {
    await api(`/roles/${id}`, {
      method: 'put',
      data: { users },
    });
  }

  static async deleteRole(id) {
    await api(`/roles/${id}`, {
      method: 'delete',
    });
  }
}
