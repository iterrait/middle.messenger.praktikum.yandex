import { WsTransport } from '../core/ws-transport';
import store from '../core/Store';
import { MessageEntity } from '../types/chat.types';
import { WsTransportEvents } from '../types/websocket.types';

class MessagesController {
  private sockets: Map<number, WsTransport> = new Map();

  async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = store.getState().user.id;
    const wsTransport = new WsTransport(`${userId}/${chatId}/${token}`);

    await wsTransport.connect();
    this.sockets.set(chatId, wsTransport);

    this.subscribe(wsTransport, chatId);
    this.fetchOldMessages(chatId);
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Чат с ID:${id} нет соединения`);
    }

    socket.sendMessage({
      type: 'message',
      content: message,
    });
  }

  private onMessage(chatId: number, messages: MessageEntity | MessageEntity[]) {
    if (!messages) {
      return;
    }

    let newMessages: MessageEntity[] = [];
    const userId = store.getState().user.id;
    const currentMessages = store.getState().messages[chatId] ?? [];

    if (Array.isArray(messages)) {
      messages.reverse();
      messages.forEach((message) => {
        message.mine = (message.user_id === userId);
        newMessages.push(message);
      });
    } else {
      messages.mine = (messages.user_id === userId);
      newMessages.push(messages);
    }

    let extendedMessages = [...currentMessages, ...newMessages];
    extendedMessages = extendedMessages.filter((message) => message.type === 'message');

    store.set(`messages.${chatId}`, extendedMessages);
  }

  private onClose(id: number) {
    delete this.sockets.get(id);
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Чат с ID:${id} нет соединения`);
    }

    socket.sendMessage({ type: 'get old', content: '0' });
  }

  private subscribe(transport: WsTransport, id: number) {
    transport.on(WsTransportEvents.Message, (messages: MessageEntity | MessageEntity[]) => {
        if (Array.isArray(messages) || messages?.type === 'message') {
          this.onMessage(id, messages);
        }
      }
    );
    transport.on(WsTransportEvents.Close, () => this.onClose(id));
  }
}

export default new MessagesController();
