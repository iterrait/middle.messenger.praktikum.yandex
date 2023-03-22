import Handlebars from 'handlebars';

import chatTmpl from 'bundle-text:./chat-tmpl.hbs';

export const ChatPage = () => {
    const precompiled = (new Function('return ' + Handlebars.precompile(chatTmpl))());
    const template = Handlebars.template(precompiled);

    return template({});
};
