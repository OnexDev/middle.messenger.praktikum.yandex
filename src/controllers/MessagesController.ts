class MessagesController {
  private channels: Partial<Record<number, WebSocket>>;

  public connect(chatId: number, userId: number, token: string): void {
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this.channels[chatId] = socket;
  }

  public sendMessage(chatId: number, message: string): void {
    console.log(chatId, message);
  }

  public onMessage(message: string): void {
    console.log(message);
  }
}

export default new MessagesController();
