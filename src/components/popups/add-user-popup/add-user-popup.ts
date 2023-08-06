import { Block } from '../../../core/Block';
import Button from '../../button/Button';
import ChatsController from '../../../controllers/chats-controller';
import addUserPopupTemplate from './add-user-popup-tmpl';
import Input from '../../input/input';
import { store } from '../../../core/Store';
import { UserData } from '../../../types/chat.types';

interface AddUserPopupProps {
  events?: {
    onCancelClick?: unknown,
    onSubmitClick?: unknown,
  }
}

export class BaseAddUserPopup extends Block<AddUserPopupProps> {
  constructor(props: AddUserPopupProps) {
    super( { ...props });
  }

  init() {
    this.children.userIdInput = new Input({
      label: 'ID user',
      type: 'text',
      placeholder: 'Введите user ID',
      name: 'userId',
    });

    this.children.cancelButton = new Button({
      text: 'Отменить',
      attr: {
        type: 'button',
        class: 'button-secondary',
      },
      events: {
        click: () => this.props.events?.onCancelClick(),
      },
    });

    this.children.saveButton = new Button({
      text: 'Сохранить',
      attr: {
        type: 'submit',
        class: 'button-primary',
      },
      events: {
        click: (event) => this.onSubmit(event),
      }
    });
  }

  render(): DocumentFragment {
    return this.compile(addUserPopupTemplate, {
      ...this.props,
    });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const addUserForm = document.getElementById('add-user-popup-form') as HTMLFormElement;

    if(!addUserForm){
      return;
    }

    const formData = new FormData(addUserForm);
    const chatId = store.getState().activeChat.id;

    const data: UserData = {
      chatId: chatId,
      users: [formData.get('userId') as number],
    };

    await ChatsController.addUserToChat(data).then(() => {
      ChatsController.getChatUsers(chatId).then(() => {
        this.props.events?.onSubmitClick();
      });
    });
  }
}

