import Handlebars from 'handlebars';

import { inputTmpl } from './input-tmpl';

export const AppInput = (props) => {
    return Handlebars.compile(inputTmpl)(props);
}
