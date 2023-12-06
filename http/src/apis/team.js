import { api } from '../core/axios.js';

export class Team {
  static async getTeams() {
    await api('/teams', {
      method: 'get',
      params: {
        take: 10,
        skip: 0,
      },
    });
  }

  static async createTeam() {
    await api('/teams', {
      method: 'post',
      data: {
        name: 'test',
        leader: 3,
      },
    });
  }

  static async updateTeam(id) {
    await api(`/teams/${id}`, {
      method: 'patch',
      data: { name: 'test', leader: 3 },
    });
  }

  static async updateTeamUsers(id, users) {
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
