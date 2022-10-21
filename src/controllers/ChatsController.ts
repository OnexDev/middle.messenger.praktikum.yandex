import API, {
  Chat, ChatDTO, ChatsAPI, ChatsOptions,
} from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

export const transformerChat2DTO = (chat: Chat): ChatDTO => ({
  ...chat,
  unread_count: chat.unreadCount,
  last_message: chat.lastMessage,
});

export const transformerDTO2Chat = (dto: ChatDTO): Chat => ({
  ...dto,
  unreadCount: dto.unread_count,
  lastMessage: dto.last_message,
});

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

  public async addUserToChat(chatId:number, userId:number) {
    try {
      await this.api.addUsersToChat({
        users: [userId],
        chatId,
      });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async getUsersFromChat(chatId?:number) {
    if (!chatId) {
      return;
    }
    try {
      const users = await this.api.getChatUsers(chatId);
      const { userLists } = store.getState().chats!;
      store.set('chats.userList', { ...userLists, [chatId]: users });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async removeUserFromChat(chatId: number, userId: number) {
    try {
      await this.api.removeUsersFromChat({
        users: [userId],
        chatId,
      });
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
      const normalChats = await Promise.all(chats.map(async (chat) => {
        const token = await this.getChatToken(chat.id);
        await MessagesController.connect(chat.id, token);
        return transformerDTO2Chat(chat);
      }));
      store.set('chats.data', normalChats);
    } catch (e) {
      store.set('chats.error', e);
    }

    store.set('chats.isLoaded', true);
  }

  public async getChatToken(id: number) {
    try {
      const token = await this.api.getToken(id);
      const { chatsTokens } = store.getState();
      store.set('chatsTokens', { ...chatsTokens, [id]: token });
      return token;
    } catch (e) {
      throw Error(e);
    }
  }

  selectChat(id: number) {
    if (store.getState().chats?.selectedChat === id) {
      store.set('chats.selectedChat', undefined);
      return;
    }
    store.set('chats.selectedChat', id);
  }
}

export default new ChatsController();
