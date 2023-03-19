import { buttonTmpl } from '../../components/button/button.tmpl';
import { inputTmpl } from '../../components/input/input.tmpl';
import { linkTmpl } from '../../components/link/link.tmpl';

export const signUpTmpl = `
    <div class="auth">
        <form>
            <div class="form-title">Регистрация</div>
                ${inputTmpl}
                ${inputTmpl}
                ${inputTmpl}
                ${inputTmpl}
                ${inputTmpl}
                ${inputTmpl}
                ${inputTmpl}
                ${buttonTmpl}
                ${linkTmpl}
        </form>
    </div>
`;
