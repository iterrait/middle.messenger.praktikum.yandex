import AuthController from '../../controllers/auth-controller';
import {Block} from '../../core/block';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import settingsTemplate from './settings-tmpl';
import {validateForm} from '../../utils/validator';
import BaseLink from '../../components/link/link';
import { State, withStore } from '../../core/Store';
import router from '../../core/router';
import {AvatarButtonWithStore} from '../../components/avatar-button/avatar-button';
import {settingsController} from '../../controllers/settings-controller';

interface SettingsProps {
  user?: {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar: string;
  };
  message: string;
}

export class BaseSettingsPage extends Block<SettingsProps> {
  protected avatarFile: HTMLInputElement | null = null;
  protected formData: FormData | null = null;

  constructor(props: SettingsProps) {
    super( { ...props });
  }

  init() {
    this.setChildren();
  }

  setChildren(): void {
    this.children.avatarButton = new AvatarButtonWithStore({
      events: {
        click: (event) => this.changeAvatar(event),
      }
    });

    this.children.avatarFile = new Input({
      id: 'avatar-file',
      type: 'file',
      name: 'avatar',
      events: {
        change: (event) => this.changeAvatarFile(event),
      },
    });

    this.children.loginInput = new Input({
      name: 'login',
      label: 'логин',
      type: 'text',
      value: this.props.user?.login,
      placeholder: 'Введите логин',
    });

    this.children.emailInput = new Input({
      name: 'email',
      label: 'почта',
      type: 'text',
      value: this.props.user?.email,
      placeholder: 'Введите почту',
    });

    this.children.avatarInput = new Input({
      name: 'avatar',
      type: 'file',
      id: 'avatar-file',
    });

    this.children.firstnameInput = new Input({
      name: 'first_name',
      label: 'имя',
      type: 'text',
      placeholder: 'John',
      value: this.props.user?.first_name,
    });

    this.children.lastnameInput = new Input({
      name: 'second_name',
      label: 'фамилия',
      type: 'text',
      placeholder: 'Doe',
      value: this.props.user?.second_name,
    });

    this.children.displayNameInput = new Input({
      name: 'display_name',
      label: 'Имя в чате',
      type: 'text',
      placeholder: 'Иван',
      value: this.props.user?.display_name,
    });

    this.children.phoneInput = new Input({
      name: 'phone',
      label: 'телефон',
      type: 'text',
      placeholder: '+7 (012) 345-67-89',
      value: this.props.user?.phone,
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

    this.children.changePasswordLink = new BaseLink({
      text: 'Изменить пароль',
      attr: {
        class: 'link',
      },
      events: {
        click: () => this.navigateToChangePassword(),
      }
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

    this.children.logoutLink = new BaseLink({
      text: 'Выйти из профиля',
      attr: {
        class: 'link',
      },
      events: {
        click: () => this.onLogout(),
      }
    });
  }

  render(): DocumentFragment {
    return this.compile(settingsTemplate, { ...this.props });
  }

  componentDidUpdate() {
    this.setChildren();

    return true;
  }

  navigateToChangePassword(): void {
    router.go('/change-password');
  }

  onLogout(): void {
    AuthController.logout();
  }

  onCancel(): void {
    router.back();
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const profileForm = document.getElementById('profile-form') as HTMLFormElement;
    const formData = new FormData(profileForm);

    if (!profileForm) {
      return;
    }

    const obj: Record<string, any> = {};

    for (const pair of formData.entries()) {
      obj[pair[0]] = pair[1];
    }

    validateForm(obj);

    if (validateForm(obj)) {
      settingsController.updateProfile(obj).then(() => {
        this.setProps({
          ...this.props,
          message: 'Изменения успешно сохранены',
        })
      });
    }
  }

  changeAvatarFile(event): void {
    event.preventDefault();

    if (!this.avatarFile?.files) {
      return;
    }

    const formData = new FormData();
    formData.append('avatar', this.avatarFile.files[0]);

    settingsController.changeAvatar(formData).then();
  }

  changeAvatar(event: Event): void {
    event.preventDefault();

    this.avatarFile = document.getElementById('avatar-file') as HTMLInputElement;

    if (!this.avatarFile) {
      return;
    }
    this.avatarFile.click();
  }
}

function mapStateToProps(state: State) {
  return {
    user: state.user,
  };
}

export const SettingsPage = withStore(mapStateToProps)(BaseSettingsPage);
