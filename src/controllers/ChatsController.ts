import API, { ChatsAPI, ChatsOptions } from '../api/ChatsAPI';
import store from '../utils/Store';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  public async get(data: ChatsOptions) {
    try {
      await this.api.get(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  public async create(title: string) {
    try {
      await this.api.create({ title });
      await this.fetchChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchChats() {
    store.set('chats.isLoaded', false);
    try {
      const chats = await this.api.read();
      // chats.map(async (chat) => {
      //   const token = await this.getChatToken(chat.id);
      //   console.log(token);
      // });
      store.set('chats.data', chats);
    } catch (e) {
      store.set('chats.error', e);
    }

    store.set('chats.isLoaded', true);
  }

  public async getChatToken(id: number) {
    try {
      const token = await this.api.getMessagerServerToken(id);
      const { chatsTokens } = store.getState();
      store.set('chatsTokens', { chatsTokens, [id]: token });
      return chatsTokens;
    } catch (e) {
      throw Error(e);
    }
  }

  selectChat(id: number) {
    store.set('chats.selectedChat', id);
  }
}

export default new ChatsController();
