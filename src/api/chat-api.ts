import { API } from './api';
import {
  UserData,
  ChatEntity,
  ChatListSearchData,
  CreateChatEntity,
} from '../types/chat.types';
import { IUser } from '../types/auth.types';

export class ChatApi extends API {
  constructor() {
    super('/chats');
  }

  getChatLists(data: ChatListSearchData): Promise<ChatEntity[]> {
    return this.http.get('/', data);
  }

  deleteChat(chatId: number): Promise<string> {
    return this.http.delete('/', { chatId });
  }

  createChat(data: CreateChatEntity): Promise<{ id: number }> {
    return this.http.post('/', data);
  }

  getToken(chatId: number): Promise<string> {
    return this.http.post(`/token/${chatId}`);
  }

  getChatUsers(chatId: number): Promise<IUser[]> {
    return this.http.get(`/${chatId}/users`);
  }

  addUserToChat(data: UserData): Promise<string> {
    return this.http.put('/users', data);
  }

  deleteUserFromChat(data: UserData): Promise<string> {
    return this.http.delete('/users', data);
  }

  getNewMessages(chatId: number): Promise<{ unread_count: number }> {
    return this.http.get(`/new/${chatId}`);
  }
}
