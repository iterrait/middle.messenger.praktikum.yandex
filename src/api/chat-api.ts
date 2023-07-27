import { API } from './api';
import {
  UserData,
  CreateChatEntity,
} from '../types/chat.types';

export class ChatApi extends API {
  constructor() {
    super('/chats');
  }

  getChatLists() {
    return this.http.get('/');
  }

  deleteChat(chatId: number) {
    return this.http.delete('/',{ data: { chatId }});
  }

  createChat(data: CreateChatEntity) {
    return this.http.post('/', { data });
  }

  getToken(chatId: number) {
    return this.http.post(`/token/${chatId}`);
  }

  getChatUsers(chatId: number) {
    return this.http.get(`/${chatId}/users`);
  }

  addUserToChat(data: UserData) {
    return this.http.put('/users', { data });
  }

  deleteUserFromChat(data: UserData) {
    return this.http.delete('/users', { data });
  }

  getNewMessages(chatId: number) {
    return this.http.get(`/new/${chatId}`);
  }
}
