import {
  ChatListSearchData,
  CreateChatEntity,
} from '../types/chat.types';
import { ChatApi } from '../api/chat-api';
import store from '../core/Store';

class ChatsController {
  private api = new ChatApi();

  async getChatList(options: ChatListSearchData) {
    try {
      const chats = await this.api.getChatLists(options);

      store.set('chats', chats);
    } catch (error) {
      console.log('getChatList error', error);
      throw error;
    }
  }

  async createChat(options: CreateChatEntity) {
    try {
      await this.api.createChat(options);
    } catch (error) {
      console.log('createChat error', error);
      throw error;
    }
  }

  async createChat(options: CreateChatEntity) {
    try {
      await this.api.createChat(options);
    } catch (error) {
      console.log('createChat error', error);
      throw error;
    }
  }
}

export default new ChatsController();
