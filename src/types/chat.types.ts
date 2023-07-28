import {IUser} from './auth.types';

export interface ChatListSearchData {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface CreateChatEntity {
  title: string;
}

export interface ChatEntity {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  users?: IUser[];
  last_message?: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string
    };
    time: string;
    content: string;
  }
}

export interface MessageEntity {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
  mine?: boolean;
}

export enum StorageEvent {
  UpdateState = 'update',
}

export interface UserData {
  chatId: number;
  users: number[];
}
