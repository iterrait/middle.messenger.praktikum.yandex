import AuthController from '../../controllers/auth-controller';
import BaseLink from '../../components/link/link';
import { Block } from '../../core/block';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { ISignInData } from '../../types/auth.types';
import signInTemplate from './sign-in-tmpl';
import { validateForm } from '../../utils/validator';

interface SignInProps {
  loginInput: Block;
  passwordInput: Block;
  signInButton: Block;
  noAccountLink: Block;
}

export class SignInPage extends Block<SignInProps> {
  constructor(props: SignInProps) {
    super({ ...props });
  }

  init() {
    this.children.loginInput = new Input({
      label: 'логин',
      type: 'text',
      placeholder: 'Введите логин...',
      name: 'login',
    });

    this.children.passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      placeholder: 'Введите пароль...',
      name: 'password',
    });

    this.children.signInButton = new Button({
      attr: {
        type: 'submit',
        class: 'button-primary',
      },
      text: 'Войти',
      events: {
        click: (event) => this.onSubmit(event),
      },
    });

    this.children.noAccountLink = new BaseLink({
      text: 'Нет аккаунта?',
      attr: {
        href: '/sign-up',
        class: 'link',
      },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    let data: ISignInData = {
      login: '',
      password: '',
    };

    [...document.querySelectorAll('input')]
      .map((child) => (data[child.name] = child.value));

    if (validateForm(data)) {
      AuthController.signIn(data).then();
    }
  }

  render(): DocumentFragment {
    return this.compile(signInTemplate, this.props);
  }
}
