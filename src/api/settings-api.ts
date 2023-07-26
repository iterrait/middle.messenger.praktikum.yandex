import { API } from './api';
import { ISettingsData, IPasswordData } from '../types';

export class SettingsApi extends API {
  constructor() {
    super('/user');
  }
  update(profile: ISettingsData): Promise<string> {
    return this.http.put('/profile', profile);
  }

  changePassword(data: IPasswordData): Promise<string> {
    return this.http.put('/password', data);
  }

  changeAvatar(data: FormData): Promise<string> {
    return this.http.put('/profile/avatar', data);
  }
}
