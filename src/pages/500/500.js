import Handlebars from 'handlebars';

import { AppLink } from '../../components/link/link';

import tmpl500 from 'bundle-text:./500-tmpl.hbs';

const props = {
    link: {
        text: 'Назад к чатам',
        href: '/chat.html'
    },
}

export const Page500 = () => {
    const precompiled = (new Function('return ' + Handlebars.precompile(tmpl500))());
    const template = Handlebars.template(precompiled);

    return template({
        goToChatLink: AppLink(props.link),
    });
};
