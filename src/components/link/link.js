import Handlebars from 'handlebars';

import { linkTmpl } from './link-tmpl';

export const AppLink = (props) => {
    return Handlebars.compile(linkTmpl)(props);
}
