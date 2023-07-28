import AuthController from '../../controllers/auth-controller';
import BaseLink from '../../components/link/link';
import { Block } from '../../core/block';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { ISignInData } from '../../types/auth.types';
import signInTemplate from './sign-in-tmpl';
import { validateForm } from '../../utils/validator';
import { getFormData } from '../../utils/convert.utils';

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

    const signInForm = document.getElementById('sign-in-form') as HTMLFormElement;

    if (!signInForm) {
      return;
    }

    const obj = getFormData(new FormData(signInForm)) as ISignInData;

    if (validateForm(obj)) {
      AuthController.signIn(obj).then();
    }
  }

  render(): DocumentFragment {
    return this.compile(signInTemplate, this.props);
  }
}
