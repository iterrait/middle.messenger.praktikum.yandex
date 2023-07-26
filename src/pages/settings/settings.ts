import { Block } from '../../core/block';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import profileTemplate from './profile-tmpl';
import { validateForm } from '../../utils/validator';

interface SettingsProps {
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
}

class ProfilePage extends Block<SettingsProps> {
  constructor(props: SettingsProps) {
    super( { ...props });
  }

  init() {
    this.children.loginInput = new Input({
      name: 'login',
      label: 'логин',
      type: 'text',
      placeholder: 'Введите логин',
    });

    this.children.avatarInput = new Input({
      name: 'avatar',
      type: 'file',
      isHidden: true,
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

    this.children.displayNameInput = new Input({
      name: 'display_name',
      label: 'Имя в чате',
      type: 'text',
      placeholder: 'Иван',
    });

    this.children.descriptionInput = new Input({
      name: 'description',
      label: 'описание',
      type: 'text',
      placeholder: 'Описание',
    });

    this.children.phoneInput = new Input({
      name: 'phone',
      label: 'телефон',
      type: 'text',
      placeholder: '+7 (012) 345-67-89',
    });

    this.children.saveButton = new Button({
      text: 'Сохранить',
      attr: {
        type: 'submit',
        class: 'button-primary',
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(profileTemplate, this.props);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const data: any = {};

    [...document.querySelectorAll('input')]
      .map((child) => (data[child.name] = child.value));

    if (validateForm(data)) {}
  }
}
