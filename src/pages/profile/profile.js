import Handlebars from 'handlebars';

import { AppButton } from '../../components/button/button';
import { AppCloseButton } from '../../components/close-button/close-button';
import { AppInput } from '../../components/input/input';

import profileTmpl from 'bundle-text:./profile-tmpl.hbs';

const props = {
    avatar: {
        url: 'https://mobimg.b-cdn.net/v3/fetch/31/316300490e59a585c7ab4f2e6ae77b9e.jpeg',
        type: 'file',
        isHidden: 'true',
        name: 'avatar',
    },
    login: {
        label: 'логин',
        type: 'text',
        placeholder: '',
        value: 'example',
        name: 'login',
    },
    firstname: {
        label: 'имя',
        type: 'text',
        placeholder: 'John',
        value: 'John',
        name: 'first_name',
    },
    lastname: {
        label: 'фамилия',
        type: 'text',
        placeholder: 'Doe',
        value: 'Doe',
        name: 'second_name',
    },
    displayName: {
        label: 'Имя в чате',
        type: 'text',
        placeholder: 'Иван',
        value: 'Иван',
        name: 'display_name',
    },
    description: {
        label: 'описание',
        type: 'text',
        placeholder: 'Описание',
        value: 'Живу в Альбукерке, ничем не занимаюсь.Йоу.',
        name: 'description',
    },
    phone: {
        label: 'телефон',
        type: 'text',
        placeholder: '+7 (012) 345-67-89',
        value: '+7 (012) 345-67-89',
        name: 'phone',
    },
    password: {
        label: 'Пароль',
        type: 'password',
        placeholder: '',
        value: '123',
        name: 'password',
    },
    button: {
        type: 'submit',
        class: 'button-primary',
        text: 'Сохранить',
    },
}

export const ProfilePage = () => {
    const precompiled = (new Function('return ' + Handlebars.precompile(profileTmpl))());
    const template = Handlebars.template(precompiled);

    return template({
        avatarInput: AppInput(props.avatar),
        loginInput: AppInput(props.login),
        firstnameInput: AppInput(props.firstname),
        lastnameInput: AppInput(props.lastname),
        displayNameInput: AppInput(props.displayName),
        descriptionInput: AppInput(props.description),
        phoneInput: AppInput(props.phone),
        passwordInput: AppInput(props.password),
        saveButton: AppButton(props.button),
        closeButton: AppCloseButton(),
        avatar: props.avatar.url,
        firstname: props.firstname.value,
        lastname: props.lastname.value,
        login: props.login.value,
        description: props.description.value,
    });
};
