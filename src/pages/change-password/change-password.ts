import Block from '../../core/block';

import { validateForm } from '../../utils/validator';

import Button from '../../components/Button/Button';
import Input from '../../components/input/input';
import changePasswordTemplate from './change-password-tmpl';
import CloseButton from '../../components/close-button/close-button';

interface Props {
  oldPasswordInput: Block;
  newPasswordInput: Block;
  confirmNewPasswordInput: Block;
  closeButton: Block;
  saveButton: Block;
  events?: {
    submit: (e: Event) => void;
  },
}

const data = {
  oldPassword: {
    label: 'старый пароль',
    type: 'password',
    placeholder: 'пароль',
    name: 'password',
  },
  newPassword: {
    label: 'пароль',
    type: 'password',
    placeholder: 'пароль',
    name: 'new_password',
  },
  confirmNewPassword: {
    label: 'подтверждение пароля',
    type: 'password',
    placeholder: 'пароль',
    name: 'confirm_password',
  },
  button: {
    text: 'Сохранить',
    attr: {
      type: 'submit',
      class: 'button-primary',
    },
  },
  closeButton: {
    attr: {
      class: 'close-button',
    }
  },
}

class ChangePasswordPage extends Block<Props> {
  constructor(props: Props) {
    const events = {
      submit: (e: Event) => this.onSubmit(e),
    };
    super('div', {...props, events});
    this.element?.classList.add('change-password');
  }

  render(): DocumentFragment {
    return this.compile(changePasswordTemplate, this.props);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const form = document.getElementById('change-password-form') as HTMLFormElement;
    const formData = new FormData(form);
    const obj: Record<string, any> = {};

    validateForm(formData);

    for (const pair of formData.entries()) {
      obj[pair[0]] = pair[1];
    }

    console.log('change-password-form', obj);
  }
}

export default new ChangePasswordPage({
  oldPasswordInput: new Input(data.oldPassword),
  newPasswordInput: new Input(data.newPassword),
  confirmNewPasswordInput: new Input(data.confirmNewPassword),
  closeButton: new CloseButton(data.closeButton),
  saveButton: new Button(data.button),
});
