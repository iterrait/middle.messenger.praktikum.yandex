import EventBus from './event-bus';
import { WsTransportEvents } from '../types/websocket.types';

export class WsTransport extends EventBus {
  static API_URL = 'wss://ya-praktikum.tech/ws/chats/';

  protected url: string;
  protected socket: WebSocket | null = null;

  constructor(endpoint: string) {
    super();
    this.url = `${WsTransport.API_URL}${endpoint}`;
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);

    return new Promise((resolve) => {
      this.on(WsTransportEvents.Connected, () => {
        this.sendMessage({ type: 'ping' });
        setInterval(() => this.sendMessage({ type: 'ping' }), 10000);
        resolve();
      });
    });
  }

  public sendMessage(data: unknown) {
    if (!this.socket) {
      throw new Error("Невозможно отправить сообщение");
    }

    this.socket.send(JSON.stringify(data));
  }

  public close() {
    this.socket?.close();
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WsTransportEvents.Connected);
    });

    socket.addEventListener('close', () => {
      this.emit(WsTransportEvents.Close);
    });

    socket.addEventListener('message', (message) => {
      this.emit(WsTransportEvents.Message, JSON.parse(message.data));
    });

    socket.addEventListener('error', (e) => {
      this.emit(WsTransportEvents.Error, e);
    });
  }
}
