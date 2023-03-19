import * as Handlebars from "handlebars";

import { chatTmpl } from './chat-tmpl';

export const Chat = () => {
    return Handlebars.compile(chatTmpl)();
};
