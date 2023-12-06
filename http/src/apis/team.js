import { api } from '../core/axios.js';

export class Team {
  static async getTeams(take, skip) {
    await api('/teams', {
      method: 'get',
      params: { take, skip },
    });
  }

  static async createTeam(name, leader) {
    await api('/teams', {
      method: 'post',
      data: { name, leader },
    });
  }

  static async updateTeam(id, name, leader) {
    await api(`/teams/${id}`, {
      method: 'patch',
      data: { name, leader },
    });
  }

  static async updateTeamMembers(id, members) {
    await api(`/teams/${id}`, {
      method: 'put',
      data: { members },
    });
  }

  static async deleteTeam(id) {
    await api(`/teams/${id}`, {
      method: 'delete',
    });
  }
}
