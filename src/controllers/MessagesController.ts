import store from '../utils/Store';
import WSClient, { WSClientEvents } from '../utils/WSClient';

export interface Message {
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
    }
}

class MessagesController {
  private channels: Map<number, WSClient> = new Map();

  public async connect(chatId: number, token: string) {
    if (this.channels.has(chatId)) {
      return;
    }
    const userId = store.getState().user?.id;
    const ws = new WSClient(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this.channels.set(chatId, ws);
    await ws.connect();
    this.subscribe(ws, chatId);
    this.fetchOldMessage(chatId);
  }

  public sendMessage(chatId: number, message: string): void {
    const socket = this.channels.get(chatId);
    if (!socket) {
      throw new Error(`Chat ${chatId} is not connetcted`);
    }
    socket.send({ type: 'message', content: message });
  }

  closeAll() {
    Array.from(this.channels.values()).forEach((socket) => socket.close());
  }

  public onMessage(chatId: number, message: Message | Message[]): void {
    let messagesToAdd: Message[] = [];

    if (Array.isArray(message)) {
      messagesToAdd = message.reverse();
    } else {
      messagesToAdd.push(message);
    }

    const currentMessages = (store.getState().messages || {})[chatId] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${chatId}`, messagesToAdd);

    store.set('chats.data', store.getState().chats?.data.map((chat) => {
      if (chatId !== chat.id) {
        return chat;
      }

      return {
        ...chat,
        last_message: messagesToAdd[messagesToAdd.length - 1],
      };
    }));
  }

  onClose(id: number) {
    this.channels.delete(id);
  }

  private subscribe(transport: WSClient, chatId: number) {
    transport.on(WSClientEvents.MESSAGE, (messages) => this.onMessage(chatId, messages));
    transport.on(WSClientEvents.CLOSE, () => this.onClose(chatId));
  }

  fetchOldMessage(chatId: number) {
    const socket = this.channels.get(chatId);
    if (!socket) {
      throw new Error(`Chat ${chatId} is not connetcted`);
    }
    socket.send({ type: 'get old', content: '0' });
  }
}

export default new MessagesController();
