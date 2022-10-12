import BaseAPI from './BaseAPI';
import { User } from './AuthAPI';
import { GetListWithPagination } from '../models/GetListWithPagination';

export interface Message {
    'user': Omit<User, 'id'>
    'time': string,
    'content': string,
}

export interface Chat {
    'id': number,
    'title': string,
    'avatar': string,
    'unread_count': number,
    'last_message'?: Message
}

export interface ChatsOptions extends GetListWithPagination{
     title: string
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  create(data:{ title: string}) {
    return this.http.post('/', { data });
  }

  get(data: ChatsOptions): Promise<Chat[]> {
    return this.http.get('/', { data });
  }

  read(): Promise<Chat[]> {
    return this.http.get('/');
  }

  getChatsArchive(): Promise<Chat> {
    return this.http.get('/archive');
  }

  delete(data: { chatId: number }):
      Promise<{
        userId: number,
        result: {
          id: number,
          title: string,
          avatar: string,
      }}> {
    return this.http.delete('/', { data });
  }

  getChatFiles(identifier: number): Promise<User> {
    return this.http.get(`/${identifier}/files`);
  }

  archiveChat(data: {chatId: number}): Promise<Chat> {
    return this.http.post('/archive', { data });
  }

  unArchiveChat(data: {chatId: number}): Promise<Chat> {
    return this.http.post('/archive', { data });
  }

  getChatUsers(identifier: number, data?:{offset: number, limit: number, name: string, email: string}): Promise<User[]> {
    return this.http.get(`/${identifier}/`, { data });
  }

  getNewMessages(identifier: number): Promise<{
      'unread_count': number
  }> {
    return this.http.get(`/new/${identifier}`);
  }

  updateAvatar(data: FormData): Promise<Chat> {
    return this.http.post('/chats/avatar', { headers: { 'Content-Type': 'multipart/form-data' }, data });
  }

  addUsersToChat(data: {
      users: number[],
      chatId: number
  }) {
    return this.http.put('/users', { data });
  }

  removeUsersFromChat(data: {
    users: number[],
    chatId: number
  }) {
    return this.http.delete('/users', { data });
  }

  async getToken(identifier: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${identifier}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
