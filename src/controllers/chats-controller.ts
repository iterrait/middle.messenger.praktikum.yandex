import {
  UserData,
  ChatListSearchData,
  CreateChatEntity,
} from '../types/chat.types';
import { ChatApi } from '../api/chat-api';
import { store } from '../core/Store';
import messagesController from '../controllers/Message-controller';

class ChatsController {
  private api = new ChatApi();

  async getChatList(options: ChatListSearchData): Promise<void>  {
    try {
      const chats = await this.api.getChatLists(options);

      chats.forEach((item) => {
        this.connectWithChat(item.id);
      });

      store.set('chats', chats);
    } catch (error) {
      console.log('getChatList error', error);
      throw error;
    }
  }

  async connectWithChat(chatId: number): Promise<void> {
    try {
      const token = await this.getToken(chatId);
      await messagesController.connect(chatId, token);
    } catch (e) {
      console.error(`Can't connect with chat id=${chatId}: `, e);
    }
  }

  async createChat(options: CreateChatEntity): Promise<void>  {
    try {
      await this.api.createChat(options);
    } catch (error) {
      console.log('createChat error', error);
      throw error;
    }
  }

  async addUserToChat(data: UserData): Promise<void>  {
    try {
      await this.api.addUserToChat(data);
    } catch (error) {
      console.log('addUserToChat error', error);
      throw error;
    }
  }

  async deleteUserFromChat(data: UserData): Promise<void>  {
    try {
      await this.api.deleteUserFromChat(data);
    } catch (error) {
      console.log('deleteUserFromChat error', error);
      throw error;
    }
  }

  async deleteChat(chatId: number): Promise<void>  {
    try {
      await this.api.deleteChat(chatId);
      store.set('activeChat', null);
    } catch (error) {
      console.log('deleteChat error', error);
      throw error;
    }
  }

  async getChatUsers(chatId: number): Promise<void>  {
    try {
      const users = await this.api.getChatUsers(chatId);
      store.set('activeChatUsers', users);
    } catch (error) {
      console.log('getChatUsers error', error);
      throw error;
    }
  }

  async getToken(chatId: number): Promise<string> {
    try {
      const response = (await this.api.getToken(chatId)) as { token: string };

      return response.token;
    } catch (e) {
      console.error('getToken error', e);
      throw e;
    }
  }

  async getNewMessages(chatId: number): Promise<void> {
    try {
      const unread = await this.api.getNewMessages(chatId);
      store.set(`chats.${chatId}.unread_count`, unread.unread_count);
    } catch (error) {
      console.log('getNewMessages error', error);
      throw error;
    }
  }
}

export default new ChatsController();
