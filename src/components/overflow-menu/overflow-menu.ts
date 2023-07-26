import { Block } from '../../core/block';
import Button from '../../components/button/button';
import overflowMenuTemplate from './overflow-menu-tmpl';
import { BaseAddUserPopup } from '../popups/add-user-popup/add-user-popup';
import store, { State, withStore } from '../../core/Store';
import { BaseDeleteUserPopup } from '../popups/delete-user-popup/delete-user-popup';
import ChatsController from '../../controllers/chats-controller';
import { ChatEntity } from '../../types/chat.types';

interface OverflowMenu {
  activeChat: ChatEntity,
  chatUsers: number;
}

class BaseOverflowMenu extends Block<OverflowMenu> {
  constructor(props: OverflowMenu) {
    super( { ...props });
  }

  init() {
    this.children.addUserButton = new Button({
      text: 'Добавить пользователя',
      attr: {
        type: 'button',
        class: 'button-secondary',
      },
      events: {
        click: () => {
          this.children.addUserPopup = new BaseAddUserPopup({
            events: {
              onSubmitClick: () => this.hideAddUserPopup(),
              onCancelClick: () => this.hideAddUserPopup(),
            }
          });

          this.setProps({
            ...this.props,
          });
        },
      },
    });

    this.children.deleteUserButton = new Button({
      text: 'Удалить пользователя',
      attr: {
        type: 'button',
        class: 'button-secondary',
      },
      events: {
        click: () => {
          this.children.deleteUserPopup = new BaseDeleteUserPopup({
            events: {
              onSubmitClick: () => this.hideDeleteUserPopup(),
              onCancelClick: () => this.hideDeleteUserPopup(),
            }
          });

          this.setProps({
            ...this.props,
          });
        },
      },
    });

    this.children.deleteChatButton = new Button({
      text: 'Удалить чат',
      attr: {
        type: 'button',
        class: 'button-secondary',
      },
      events: {
        click: () => this.deleteChat(),
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(overflowMenuTemplate, {
      ...this.props,
    });
  }

  hideAddUserPopup(): void {
    delete this.children.addUserPopup;

    this.setProps({
      ...this.props,
    });
  }

  hideDeleteUserPopup(): void {
    delete this.children.deleteUserPopup;

    this.setProps({
      ...this.props,
    });
  }

  async deleteChat(): Promise<void> {
    await ChatsController.deleteChat(store.getState().activeChat.id).then(() => {
      ChatsController.getChatList({}).then();
    });
  }
}

function mapStateToProps(state: State) {
  return {
    activeChat: state.activeChat,
    chats: state.chats,
  };
}

export const BaseOverflowMenuWithStore = withStore(mapStateToProps)(BaseOverflowMenu);

