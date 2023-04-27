import Block from '../../core/block';

import { validateForm } from '../../utils/validator';

import Button from '../../components/button/button';
import ChatPreview from '../../components/chat-preview/chat-preview';
import Input from '../../components/input/input';

import chatTemplate from './chat-tmpl';

interface Props {
  chatPreview: Block,
  fileInput: Block,
  messageInput: Block,
  sendMessageButton: Block,
  events?: {
    submit: (e: Event) => void;
  };
}

const data = {
  preview: {
    firstname: 'Иван',
    lastname: 'Белов',
    message: 'Длинное сообщение. Длинное сообщение. Длинное сообщение. Длинное сообщение',
    time: '10:40',
    count: 4,
  },
  fileInput: {
    attr: {
      class: 'hidden',
    },
    name: 'file',
    type: 'file',
  },
  messageInput: {
    attr: {
      class: 'message',
    },
    name: 'message',
    type: 'text',
    placeholder: 'Введите сообщение',
  },
  sendMessageButton: {
    text: '',
    attr: {
      class: 'send-message',
    },
  },
};

class ChatPage extends Block<Props> {
  constructor(props: Props) {
    const events = {
      submit: (e: Event) => this.onSubmit(e),
    };
    super('div', { ...props, events });
    this.element?.classList.add('chat');
  }

  render(): DocumentFragment {
    return this.compile(chatTemplate, this.props);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const form = document.getElementById('chat-form') as HTMLFormElement;
    const formData = new FormData(form);
    const obj: Record<string, any> = {};

    validateForm(formData);

    for (const pair of formData.entries()) {
      obj[pair[0]] = pair[1];
    }

    console.log('chat-form', obj);
  }
}

export default new ChatPage({
  chatPreview: new ChatPreview(data.preview),
  fileInput: new Input(data.fileInput),
  messageInput: new Input(data.messageInput),
  sendMessageButton: new Button(data.sendMessageButton),
});
