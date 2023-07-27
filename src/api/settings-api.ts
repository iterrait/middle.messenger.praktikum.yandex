import { API } from './api';
import { ISettingsData, IPasswordData } from '../types';

export class SettingsApi extends API {
  constructor() {
    super('/user');
  }
  update(profile: ISettingsData) {
    return this.http.put('/profile', { data: profile });
  }

  changePassword(data: IPasswordData) {
    return this.http.put('/password', { data });
  }

  changeAvatar(data: FormData) {
    return this.http.put('/profile/avatar', { data });
  }
}
