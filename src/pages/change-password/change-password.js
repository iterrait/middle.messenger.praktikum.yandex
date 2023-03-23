import Handlebars from 'handlebars';

import { AppButton } from '../../components/button/button';
import { AppCloseButton } from '../../components/close-button/close-button';
import { AppInput } from '../../components/input/input';

import changePasswordTmpl from 'bundle-text:./change-password-tmpl.hbs';

const props = {
    oldPassword: {
        label: 'старый пароль',
        type: 'password',
        placeholder: 'пароль',
        value: '123',
        name: 'oldPassword',
    },
    newPassword: {
        label: 'пароль',
        type: 'password',
        placeholder: 'пароль',
        value: '123',
        name: 'newPassword',
    },
    confirmNewPassword: {
        label: 'подтверждение пароля',
        type: 'password',
        placeholder: 'пароль',
        value: '123',
        name: 'newPassword',
    },
    button: {
        type: 'submit',
        class: 'button-primary',
        text: 'Сохранить',
    },
}

export const ChangePasswordPage = () => {
    const precompiled = (new Function('return ' + Handlebars.precompile(changePasswordTmpl))());
    const template = Handlebars.template(precompiled);

    return template({
        oldPasswordInput: AppInput(props.oldPassword),
        newPasswordInput: AppInput(props.newPassword),
        confirmNewPasswordInput: AppInput(props.confirmNewPassword),
        closeButton: AppCloseButton(),
        saveButton: AppButton(props.button),
    });
};
