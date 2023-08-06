import { CurrentChatWithStore } from '../../components/active-chat/active-chat';
import BaseLink from '../../components/link/link';
import { Block } from '../../core/block';
import Button from '../../components/button/Button';
import ChatsController from '../../controllers/chats-controller';
import { ChatEntity } from '../../types/chat.types';
import { ChatPreviewWithStore} from '../../components/chat-preview/chat-preview';
import chatListTemplate from './chat-list-tmpl';
import { CreateChatPopup } from '../../components/popups/create-chat-popup/create-chat-popup';
import Input from '../../components/input/input';
import messagesController from '../../controllers/message-controller';
import { State, store, withStore } from '../../core/Store';
import { validateForm } from '../../utils/validator';
import { getFormData } from '../../utils/convert.utils';

interface ChatProps {
  fileInput: Block,
  messageInput: Block,
  sendMessageButton: Block,
  profileLink: Block;
  addChat: Block;
  addChatPopup: Block;
  chats: Block[],
  activeChat?: ChatEntity | null;
  activeChatWithStore: Block;
  serviceMessage: string | null;
}

class BaseChatListPage extends Block<ChatProps> {

  constructor(props: ChatProps) {
    super({ ...props });

    ChatsController.getChatList({}).then();
  }

  init() {
    this.children.profileLink = new BaseLink({
      text: 'Перейти в профиль',
      attr: {
        href: '/settings',
        class: 'link',
      },
    });

    this.children.activeChatWithStore = new CurrentChatWithStore({});

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
      events: {
        click: (event) => this.onSendMessage(event),
      },
    });

    this.setMessageInput();
  }

  onSubmitCreateChatPopup(): void {
    this.hideCreateChatPopup();
  }

  onCancelCreateChatPopup(): void {
    this.hideCreateChatPopup();
  }

  hideCreateChatPopup(): void {
    delete this.children.addChatPopup;

    this.setProps({
      ...this.props,
    });
  }

  onAddChat(): void {
    this.children.addChatPopup = new CreateChatPopup({
      events: {
        onSubmitClick: () => this.onSubmitCreateChatPopup(),
        onCancelClick: () => this.onCancelCreateChatPopup(),
      }
    });

    this.setProps({
      ...this.props,
    });
  }

  getChatPreviews(): void {
    const blocks: Block[] = [];

    store.getState().chats?.map((item) => {
      const chatBlock = new ChatPreviewWithStore({
        chat: item,
        events: {
          click: (event) => this.onChatClick(event, this, item),
        },
      })
      blocks.push(chatBlock);
    });

    this.children.chats = blocks;
  }

  onSendMessage(event: Event): void {
    event.preventDefault();

    const sendForm = document.getElementById('message-form') as HTMLFormElement;
    const formData = new FormData(sendForm);

    const obj = getFormData(new FormData(sendForm));

    if (validateForm(obj)) {
      messagesController.sendMessage(this.props.activeChat.id!, formData.get('message') as string);
      this.setMessageInput();
    }
  }

  setMessageInput(): void {
    this.children.messageInput = new Input({
      attr: {
        class: 'message-input',
      },
      name: 'message',
      type: 'text',
      id: 'message',
      placeholder: 'Введите сообщение',
    });
  }

  onChatClick(event: Event, block: Block, item: ChatEntity): void {
    event.preventDefault();

    store.set('activeChat', { ...item});
  }

  render(): DocumentFragment {
    return this.compile(chatListTemplate, this.props);
  }

  componentDidUpdate() {
    this.getChatPreviews();

    return true;
  }
}

function mapStateToProps(state: State) {
  return {
    activeChat: state.activeChat,
    chats: state.chats,
    ...state.user,
  };
}

export const ChatListPage = withStore(mapStateToProps)(BaseChatListPage);
