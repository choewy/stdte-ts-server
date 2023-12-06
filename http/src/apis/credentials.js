import { api } from '../core/axios.js';

export class Credentials {
  static async getMyCredentials() {
    await api('/credentials', { method: 'get' });
  }

  static async signin() {
    await api('/credentials/signin', {
      method: 'post',
      data: {
        email: 'developer@stdte.co.kr',
        password: 'standard',
      },
    });
  }

  static async signup() {
    await api('/credentials/signup', {
      method: 'post',
      data: {
        email: 'choewy@stdte.co.kr',
        name: '최원영',
        password: 'testtest',
        confirmPassword: 'testtest',
      },
    });
  }

  static async signout() {
    await api('/credentials/signout', {
      method: 'post',
    });
  }

  static async updatePassword() {
    await api('/credentials/password', {
      method: 'patch',
      data: {
        currentPassword: 'testtest',
        newPassword: 'testtest',
        confirmPassword: 'testtest',
      },
    });
  }
}
