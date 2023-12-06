import { api } from '../core/axios.js';

export class Profile {
  static async getMyProfile() {
    await api('/profile', { method: 'get' });
  }

  static async updateMyProfile() {
    await api('/profile', {
      method: 'patch',
      data: {
        name: '최원영',
        phone: null,
        birthday: '1995-03-02',
      },
    });
  }
}
