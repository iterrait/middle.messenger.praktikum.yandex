import { API } from './api';

export class UserApi extends API {
  constructor() {
    super('/user');
  }

}
