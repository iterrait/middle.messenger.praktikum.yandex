import { Block } from '../../../core/block';
import Button from '../../button/button';
import ChatsController from '../../../controllers/chats-controller';
import deleteUserPopupTemplate from './delete-user-popup-tmpl';
import Input from '../../input/input';
import { store } from '../../../core/Store';
import { UserData } from '../../../types/chat.types';

interface DeleteUserPopupProps {
  events?: {
    onCancelClick?: unknown,
    onSubmitClick?: unknown,
  }
}

export class BaseDeleteUserPopup extends Block<DeleteUserPopupProps> {
  constructor(props: DeleteUserPopupProps) {
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
    return this.compile(deleteUserPopupTemplate, {
      ...this.props,
    });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const deleteUserForm = document.getElementById('delete-user-popup-form') as HTMLFormElement;

    if(!deleteUserForm){
      return;
    }

    const formData = new FormData(deleteUserForm);
    const chatId = store.getState().activeChat.id;

    const data: UserData = {
      chatId: chatId,
      users: [formData.get('userId') as number],
    };

    await ChatsController.deleteUserFromChat(data).then(() => {
      ChatsController.getChatList().then(() => {
        this.props.events?.onSubmitClick();
      });
    });
  }
}

