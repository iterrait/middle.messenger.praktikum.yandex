import Block from '../../core/block';

import { validateForm } from '../../utils/validator';

import Button from '../../components/button/button';
import CloseButton from '../../components/close-button/close-button';
import Input from '../../components/input/input';
import profileTemplate from './profile-tmpl';

interface Props {
  loginInput: Block;
  avatarInput: Block;
  closeButton: Block;
  firstnameInput: Block;
  lastnameInput: Block;
  displayNameInput: Block;
  descriptionInput: Block;
  phoneInput: Block;
  passwordInput: Block;
  saveButton: Block;
  events?: {
    submit: (e: Event) => void;
  };
}

const data = {
  avatar: {
    name: 'avatar',
    url: 'https://mobimg.b-cdn.net/v3/fetch/31/316300490e59a585c7ab4f2e6ae77b9e.jpeg',
    type: 'file',
    isHidden: 'true',
  },
  login: {
    name: 'login',
    label: 'логин',
    type: 'text',
    placeholder: 'Введите логин',
  },
  firstname: {
    name: 'first_name',
    label: 'имя',
    type: 'text',
    placeholder: 'John',
  },
  lastname: {
    name: 'second_name',
    label: 'фамилия',
    type: 'text',
    placeholder: 'Doe',
  },
  displayName: {
    name: 'display_name',
    label: 'Имя в чате',
    type: 'text',
    placeholder: 'Иван',
  },
  description: {
    name: 'description',
    label: 'описание',
    type: 'text',
    placeholder: 'Описание',
  },
  phone: {
    name: 'phone',
    label: 'телефон',
    type: 'text',
    placeholder: '+7 (012) 345-67-89',
  },
  password: {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Подтвердите пароль',
  },
  closeButton: {
    attr: {
      class: 'close-button',
    }
  },
  button: {
    text: 'Сохранить',
    attr: {
      type: 'submit',
      class: 'button-primary',
    },
  },
}

class ProfilePage extends Block<Props> {
  constructor(props: Props) {
    const events = {
      submit: (e: Event) => this.onSubmit(e),
    };
    super('div', {...props, events});
    this.element?.classList.add('profile');
  }

  render(): DocumentFragment {
    return this.compile(profileTemplate, this.props);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const form = document.getElementById('profile-form') as HTMLFormElement;
    const formData = new FormData(form);
    const obj: Record<string, any> = {};

    validateForm(formData);

    for (const pair of formData.entries()) {
      obj[pair[0]] = pair[1];
    }

    console.log('profile-form', obj);
  }
}

export default new ProfilePage({
  closeButton: new CloseButton(data.closeButton),
  avatarInput: new Input(data.avatar),
  loginInput: new Input(data.login),
  firstnameInput: new Input(data.firstname),
  lastnameInput: new Input(data.lastname),
  displayNameInput: new Input(data.displayName),
  descriptionInput: new Input(data.description),
  phoneInput: new Input(data.phone),
  passwordInput: new Input(data.password),
  saveButton: new Button(data.button),
});
