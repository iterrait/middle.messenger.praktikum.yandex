import BaseLink from '../../components/link/link';
import { Block } from '../../core/block';
import Button from '../../components/button/button';
import ChatsController from '../../controllers/chats-controllers';
import chatListTemplate from './chat-list-tmpl';
import { CreateChatPopup } from '../../components/popups/create-chat-popup/create-chat-popup';
import Input from '../../components/input/input';
import store, { State, withStore } from '../../core/Store';
import {BaseChat} from '../../components/chat/chat';

interface ChatProps {
  fileInput: Block,
  messageInput: Block,
  sendMessageButton: Block,
  profileLink: Block;
  addChat: Block;
  addChatPopup: Block;
  isOpenedAddChatPopup: boolean;
  chats: Block[],
}

class BaseChatListPage extends Block {

  constructor(props: ChatProps) {
    super({ ...props });
    ChatsController.getChatList({}).then();
  }

  init() {
    this.props.isOpenedAddChatPopup = false;

    this.children.profileLink = new BaseLink({
      text: 'Перейти в профиль',
      attr: {
        href: '/settings',
        class: 'link',
      },
    });

    this.children.fileInput = new Input({
      attr: {
        class: 'hidden',
      },
      name: 'file',
      type: 'file',
    });

    this.children.messageInput = new Input({
      attr: {
        class: 'message',
      },
      name: 'message',
      type: 'text',
      placeholder: 'Введите сообщение',
    });

    this.children.addChat = new Button({
      text: 'Добавить чат',
      attr: {
        type: 'button',
        class: 'button-primary',
      },
      events: {
        click: () => this.onAddChat(),
      },
    });

    this.children.sendMessageButton = new Button({
      text: '',
      attr: {
        class: 'send-message',
      },
    });

    this.children.addChatPopup = new CreateChatPopup({
      events: {
        onSubmitClick: () => this.onSubmitCreateChatPopup(),
        onCancelClick: () => this.onCancelCreateChatPopup(),
      }
    });
  }

  onChatClick(event: Event): void {
    event.preventDefault();

    console.log('onChatClick event', event);
  }

  onSubmitCreateChatPopup(): void {
    this.hideCreateChatPopup();
  }

  onCancelCreateChatPopup(): void {
    this.hideCreateChatPopup();
  }

  hideCreateChatPopup(): void {
    this.setProps({
      ...this.props,
      isOpenedAddChatPopup: false,
    });
  }

  onAddChat(): void {
    this.setProps({
      ...this.props,
      isOpenedAddChatPopup: true,
    });
  }

  getChats(): void {
    const blocks: Block[] = [];
    store.getState().chats.map((item) => {
      const chatBlock = new BaseChat({ ...item })
      blocks.push(chatBlock);
    });

    this.children.chats = blocks;
  }

  render(): DocumentFragment {
    this.getChats();

    return this.compile(chatListTemplate, this.props);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
  }
}

function mapStateToProps(state: State) {
  return {
    chats: state.chats,
    ...state.user,
  };
}

export const ChatListPage = withStore(mapStateToProps)(BaseChatListPage);
