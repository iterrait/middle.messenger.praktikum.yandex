import { API } from './api';
import { ISignInData, ISignUpData, IUser } from '../types/auth.types';

export class AuthAPI extends API {
  constructor() {
    super('/auth');
  }

  signIn(data: ISignInData): Promise<void> {
    return this.http.post('/signin', data);
  }

  signUp(data: ISignUpData): Promise<void> {
    return this.http.post('/signup', data);
  }

  logout(): Promise<void> {
    return this.http.post('/logout');
  }

  getUser(): Promise<IUser> {
    return this.http.get('/user');
  }
}
