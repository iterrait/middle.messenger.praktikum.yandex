import { IPasswordData, IProfileData } from '../types';
import { SettingsApi } from '../api/settings-api';
import store from '../core/Store';

class SettingsController {
  private api = new SettingsApi();

  async updateProfile(profile: IProfileData) {
    try {
      const user = await this.api.update(profile);
      store.set('user', user);

    } catch (error) {
      throw error;
    }
  }

  async changePassword(data: IPasswordData) {
    try {
      await this.api.changePassword(data);
    } catch (error) {
      throw error;
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const user = await this.api.changeAvatar(data);
      store.set('user', user);

    } catch (error) {
      throw error;
    }
  }
}

export const settingsController = new SettingsController();
