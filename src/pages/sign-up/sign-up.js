import Handlebars from 'handlebars';

import { AppButton } from '../../components/button/button';
import { AppInput } from '../../components/input/input';

import signUpTmpl from 'bundle-text:./sign-up-tmpl.hbs';

const props = {
    email: {
        label: 'почта',
        type: 'text',
        placeholder: 'example@example.ru',
        value: 'johndoe@mailto.com',
        name: 'email',
    },
    login: {
        label: 'логин',
        type: 'text',
        placeholder: 'johndoe',
        value: 'johndoe',
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
    phone: {
        label: 'телефон',
        type: 'text',
        placeholder: '+7 (012) 345-67-89',
        value: '+7 (012) 345-67-89',
        name: 'phone',
    },
    password: {
        label: 'пароль',
        type: 'password',
        placeholder: '',
        value: '123',
        name: 'password',
    },
    confirmationPassword: {
        label: 'подтверждение пароля',
        type: 'password',
        placeholder: '',
        value: '123',
        name: 'repeat-password',
    },
    button: {
        type: 'submit',
        class: 'button-primary',
        text: 'зарегистрироваться',
    },
}

export const SignUpPage = () => {
    const precompiled = (new Function('return ' + Handlebars.precompile(signUpTmpl))());
    const template = Handlebars.template(precompiled);

    return template({
        emailInput: AppInput(props.email),
        loginInput: AppInput(props.login),
        firstnameInput: AppInput(props.firstname),
        lastnameInput: AppInput(props.lastname),
        phoneInput: AppInput(props.phone),
        passwordInput: AppInput(props.password),
        confirmationPasswordInput: AppInput(props.confirmationPassword),
        signUpButton: AppButton(props.button),
    });
};
