import { Block } from '../../core/block';
import Button from '../../components/button/Button';
import changePasswordTemplate from './change-password-tmpl';
import Input from '../../components/input/input';
import router from '../../core/Router';
import { settingsController } from '../../controllers/settings-controller';
import { validateForm } from '../../utils/validator';
import { getFormData } from '../../utils/convert.utils';

interface ChangePasswordProps {
  message?: string | null;
}

export class BaseChangePasswordPage extends Block<ChangePasswordProps> {
  constructor(props: ChangePasswordProps) {
    super( { ...props });
  }

  init() {
    this.children.oldPasswordInput = new Input({
      label: 'старый пароль',
      type: 'password',
      placeholder: 'пароль',
      name: 'oldPassword',
      id: 'old_password',
    });

    this.children.newPasswordInput = new Input({
      label: 'пароль',
      type: 'password',
      placeholder: 'пароль',
      name: 'newPassword',
      id: 'new_password',
    });

    this.children.confirmNewPasswordInput = new Input({
      label: 'подтверждение пароля',
      type: 'password',
      placeholder: 'пароль',
      name: 'confirmPassword',
      id: 'confirm_password',
    });

    this.children.cancelButton = new Button({
      text: 'Назад',
      attr: {
        type: 'button',
        class: 'button-secondary',
      },
      events: {
        click: () => this.onCancel(),
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
      },
    });
  }

  onCancel(): void {
    router.back();
  }

  render(): DocumentFragment {
    return this.compile(changePasswordTemplate, this.props);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const changePasswordForm = document.getElementById('change-password-form') as HTMLFormElement;

    if (!changePasswordForm) {
      return;
    }

    const obj = getFormData(new FormData(changePasswordForm));

    if (validateForm(obj)) {
      settingsController.changePassword(obj)
        .then(() => {
          this.setProps({
            ...this.props,
            message: 'Изменения успешно сохранены',
          });
        });
    }
  }
}
