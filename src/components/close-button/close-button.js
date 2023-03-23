import Handlebars from 'handlebars';

import { closeButtonTmpl } from './close-button-tmpl';

export const AppCloseButton = (props) => {
    return Handlebars.compile(closeButtonTmpl)(props);
}
