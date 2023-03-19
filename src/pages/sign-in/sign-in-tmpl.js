import { buttonTmpl } from '../../components/button/button.tmpl';
import { inputTmpl } from '../../components/input/input.tmpl';
import { linkTmpl } from '../../components/link/link.tmpl';

export const signInTmpl = `
    <div class="auth">
        <form>
            <div class="form-title">Вход</div>
                ${inputTmpl}
                ${inputTmpl}
                ${buttonTmpl}
                ${linkTmpl}
        </form>
    </div>
`;
