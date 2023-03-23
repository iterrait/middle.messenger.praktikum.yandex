import Handlebars from 'handlebars';

import { buttonTmpl } from './button-tmpl';

export const AppButton = (props) => {
    return Handlebars.compile(buttonTmpl)(props);
}
