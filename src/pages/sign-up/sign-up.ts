import AuthController from '../../controllers/auth-controller';
import { Block } from '../../core/block';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { ISignUpData } from '../../types/auth.types';
import signUpTemplate from './sign-up-tmpl';
import { validateForm } from '../../utils/validator';
import { getFormData } from '../../utils/convert.utils';

interface SignUpProps {
  confirmationPasswordInput: Block;
  emailInput: Block;
  firstnameInput: Block;
  lastnameInput: Block;
  loginInput: Block;
  passwordInput: Block;
  phoneInput: Block;
  signUpButton: Block;
}

export class SignUpPage extends Block<SignUpProps> {
  constructor(props: SignUpProps) {
    super({ ...props });
  }

  init() {
    this.children.emailInput = new Input({
      name: 'email',
      label: 'почта',
      type: 'text',
      placeholder: 'example@example.ru',
    });

    this.children.passwordInput = new Input({
      name: 'password',
      label: 'пароль',
      type: 'password',
      placeholder: 'Введите пароль...',
    });

    this.children.confirmationPasswordInput = new Input({
      name: 'confirm_password',
      label: 'подтверждение пароля',
      type: 'password',
      placeholder: 'Подтвердите пароль...',
    });

    this.children.loginInput = new Input({
      name: 'login',
      label: 'логин',
      type: 'text',
      placeholder: 'johndoe',
    });

    this.children.firstnameInput = new Input({
      name: 'first_name',
      label: 'имя',
      type: 'text',
      placeholder: 'John',
    });

    this.children.lastnameInput = new Input({
      name: 'second_name',
      label: 'фамилия',
      type: 'text',
      placeholder: 'Doe',
    });

    this.children.phoneInput = new Input({
      name: 'phone',
      label: 'телефон',
      type: 'text',
      placeholder: '+7 (012) 345-67-89',
    });

    this.children.signUpButton = new Button({
      text: 'Зарегистрироваться',
      attr: {
        type: 'submit',
        class: 'button-primary',
      },
      events: {
        click: (event) => this.onSubmit(event),
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(signUpTemplate, this.props);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const signUpForm = document.getElementById('sign-up-form') as HTMLFormElement;

    if (!signUpForm) {
      return;
    }

    const obj = getFormData(new FormData(signUpForm)) as ISignUpData;

    if (validateForm(obj)) {
      AuthController.signUp(obj).then();
    }
  }
}
