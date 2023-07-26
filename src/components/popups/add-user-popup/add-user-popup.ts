import { Block } from '../../../core/block';
import Button from '../../button/button';
import ChatsController from '../../../controllers/chats-controller';
import createChatPopupTemplate from './create-chat-popup-tmpl';
import { CreateChatEntity } from '../../../types/chat.types';
import Input from '../../input/input';

interface CreateChatPopupProps {
  chatTitleInput?: Block;
  saveButton?: Block;
  cancelButton?: Block;
  events?: {
    onCancelClick?: Function,
    onSubmitClick?: Function,
  }
}

export class CreateChatPopup extends Block<CreateChatPopupProps> {
  constructor(props: CreateChatPopupProps) {
    super( { ...props });
  }

  init() {
    this.children.chatTitleInput = new Input({
      label: 'Название чата',
      type: 'text',
      placeholder: 'Введите название чата',
      name: 'title',
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
    return this.compile(createChatPopupTemplate, {
      ...this.props,
    });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const createChatForm = document.getElementById('create-chat-popup-form') as HTMLFormElement;

    if(!createChatForm){
      return;
    }

    const formData = new FormData(createChatForm);
    const data: CreateChatEntity = {
      title: formData.get('title') as string,
    };

    await ChatsController.createChat(data).then(() => {
      ChatsController.getChatList({}).then(() => {
        this.props.events?.onSubmitClick();
      });
    });
  }
}
