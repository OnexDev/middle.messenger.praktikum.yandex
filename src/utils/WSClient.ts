import { EventBus } from './EventBus';

export enum WSClientEvents{
    CONNECTED = 'connected',
    ERROR = 'error',
    MESSAGE = 'message',
    CLOSE = 'close',
}
export default class WSClient extends EventBus {
  private socket: WebSocket | null = null;

  private pingInterval: number = 0;

  constructor(private url: string) {
    super();
  }

  public connect(): Promise<any> {
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSClientEvents.CONNECTED, () => {
        resolve(() => {});
      });
    });
  }

  subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => this.emit(WSClientEvents.CONNECTED));
    socket.addEventListener('error', (e) => this.emit(WSClientEvents.ERROR, e));
    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === 'pong') {
        return;
      }

      this.emit(WSClientEvents.MESSAGE, data);
    });
    socket.addEventListener('close', (e) => this.emit(WSClientEvents.CLOSE, e));
  }

  private setupPing() {
    this.pingInterval = window.setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000);

    this.on(WSClientEvents.CLOSE, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    });
  }

  public close() {
    this.socket?.close();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }
    this.socket?.send(JSON.stringify(data));
  }
}
