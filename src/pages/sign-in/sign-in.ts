import Block from '../../core/block';
import { validateForm } from '../../utils/validator';

import Button from '../../components/Button/Button';
import Input from '../../components/input/input';
import Link from '../../components/link/link';

import signInTemplate from './sign-in-tmpl';

interface Props {
  loginInput: Block;
  passwordInput: Block;
  signInButton: Block;
  noAccountLink: Block;
  events?: {
    submit: (e: Event) => void;
  };
}

const data = {
  login: {
    label: 'логин',
    type: 'text',
    placeholder: 'Введите логин...',
    name: 'login',
  },
  password: {
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль...',
    name: 'password',
  },
  button: {
    attr: {
      type: 'submit',
      class: 'button-primary',
    },
    text: 'Войти',
  },
  link: {
    text: 'Нет аккаунта?',
    attr: {
      href: '/sign-up.html',
      class: 'link',
    },
  },
};

class SignInPage extends Block<Props> {
  constructor(props: Props) {
    const events = {
      submit: (e: Event) => this.onSubmit(e),
    };
    super('div', { ...props, events });
    this.element?.classList.add('sign-in');
  }

  render(): DocumentFragment {
    return this.compile(signInTemplate, this.props);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const form = document.getElementById('sign-in-form') as HTMLFormElement;
    const formData = new FormData(form);
    const obj: Record<string, any> = {};

    validateForm(formData);

    for (const pair of formData.entries()) {
      obj[pair[0]] = pair[1];
    }

    console.log('sign-in-form', obj);
  }
}

export default new SignInPage({
  loginInput: new Input(data.login),
  passwordInput: new Input(data.password),
  signInButton: new Button(data.button),
  noAccountLink: new Link(data.link),
});
