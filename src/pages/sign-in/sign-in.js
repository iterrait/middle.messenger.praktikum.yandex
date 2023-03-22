import Handlebars from 'handlebars';

import { AppButton } from '../../components/button/button';
import { AppInput } from '../../components/input/input';
import { AppLink } from '../../components/link/link';

import signInTmpl from 'bundle-text:./sign-in-tmpl.hbs';

const props = {
    login: {
        label: 'логин',
        type: 'text',
        placeholder: '',
        value: 'example',
        name: 'login',
    },
    password: {
        label: 'Пароль',
        type: 'password',
        placeholder: '',
        value: '123',
        name: 'password',
        error: 'Неверный пароль'
    },
    button: {
        type: 'submit',
        class: 'button-primary',
        text: 'Войти',
    },
    link: {
        text: 'Нет аккаунта?',
        href: '/sign-up'
    },
}

export const SignInPage = () => {
    const precompiled = (new Function('return ' + Handlebars.precompile(signInTmpl))());
    const template = Handlebars.template(precompiled);

    return template({
        loginInput: AppInput(props.login),
        passwordInput: AppInput(props.password),
        signInButton: AppButton(props.button),
        noAccountLink: AppLink(props.link),
    });
};
