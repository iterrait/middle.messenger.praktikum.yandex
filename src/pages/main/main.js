import * as Handlebars from 'handlebars';

import { mainTmpl } from './main-tmpl';

export const Main = () => {
    return Handlebars.compile(mainTmpl)();
};
