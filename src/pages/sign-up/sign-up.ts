import Block from '../../core/block';

import { validateForm } from '../../utils/validator';

import Button from '../../components/Button/Button';
import Input from '../../components/input/input';
import signUpTemplate from './sign-up-tmpl';

interface Props {
  emailInput: Block;
  loginInput: Block;
  firstnameInput: Block;
  lastnameInput: Block;
  phoneInput: Block;
  passwordInput: Block;
  confirmationPasswordInput: Block;
  signUpButton: Block;
  events?: {
    submit: (e: Event) => void;
  };
}

const data = {
  email: {
    name: 'email',
    label: 'почта',
    type: 'text',
    placeholder: 'example@example.ru',
  },
  login: {
    name: 'login',
    label: 'логин',
    type: 'text',
    placeholder: 'johndoe',
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
  phone: {
    name: 'phone',
    label: 'телефон',
    type: 'text',
    placeholder: '+7 (012) 345-67-89',
  },
  password: {
    name: 'password',
    label: 'пароль',
    type: 'password',
    placeholder: 'Введите пароль...',
  },
  confirmationPassword: {
    name: 'confirm_password',
    label: 'подтверждение пароля',
    type: 'password',
    placeholder: 'Подтвердите пароль...',
  },
  button: {
    text: 'зарегистрироваться',
    attr: {
      type: 'submit',
      class: 'button-primary',
    }
  },
}

class SignUpPage extends Block<Props> {
  constructor(props: Props) {
    const events = {
      submit: (e: Event) => this.onSubmit(e),
    };
    super('div', {...props, events});
    this.element?.classList.add('sign-up');
  }

  render(): DocumentFragment {
    return this.compile(signUpTemplate, this.props);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const form = document.getElementById('sign-up-form') as HTMLFormElement;
    const formData = new FormData(form);
    const obj: Record<string, any> = {};

    validateForm(formData);

    for (const pair of formData.entries()) {
      obj[pair[0]] = pair[1];
    }

    console.log('sign-up-form', obj);
  }
}

export default new SignUpPage({
  emailInput: new Input(data.email),
  loginInput: new Input(data.login),
  firstnameInput: new Input(data.firstname),
  lastnameInput: new Input(data.lastname),
  phoneInput: new Input(data.phone),
  passwordInput: new Input(data.password),
  confirmationPasswordInput: new Input(data.confirmationPassword),
  signUpButton: new Button(data.button),
});
