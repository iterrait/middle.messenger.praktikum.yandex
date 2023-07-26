import { AuthAPI } from '../api/auth-api';
import store from '../core/Store';
import {
  ISignInData,
  ISignUpData,
} from '../types/auth.types';
import Router from '../core/router';

class AuthController {
  private api = new AuthAPI();

  async signIn(data: ISignInData) {
    try {
      await this.api.signIn(data);

      await this.fetchUser();

      Router.go('/messenger');
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(data: ISignUpData) {
    try {
      await this.api.signUp(data);

      Router.go('/messenger');
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      store.set('user', undefined);

      Router.go('/');

    } catch (error) {
      console.log(error);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.getUser();

      store.set('user', user);

    } catch (error) {
      throw error;
    }
  }
}

export default new AuthController();
