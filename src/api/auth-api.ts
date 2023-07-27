import { API } from './api';
import { ISignInData, ISignUpData, IUser } from '../types/auth.types';

export class AuthAPI extends API {
  constructor() {
    super('/auth');
  }

  signIn(data: ISignInData) {
    return this.http.post('/signin', { data });
  }

  signUp(data: ISignUpData) {
    return this.http.post('/signup', { data });
  }

  logout() {
    return this.http.post('/logout');
  }

  getUser() {
    return this.http.get('/user', {});
  }
}
