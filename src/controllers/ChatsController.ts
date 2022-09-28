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
    } catch (e: any) {
      console.error(e);
    }
  }

  public async getChatToken(id: number) {
    try {
      const token = await this.api.getMessagerServerToken(id);
      const { chatsTokens } = store.getState();
      store.set('chatsTokens', { chatsTokens, [id]: token });
    } catch (e) {
      throw Error(e);
    }
  }
}

export default new ChatsController();
