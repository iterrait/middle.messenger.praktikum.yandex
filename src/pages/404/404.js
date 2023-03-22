import Handlebars from 'handlebars';

import { AppLink } from '../../components/link/link';

import tmpl404 from 'bundle-text:./404-tmpl.hbs';

const props = {
    link: {
        text: 'Назад к чатам',
        href: '/chat'
    },
}

export const Page404 = () => {
    const precompiled = (new Function('return ' + Handlebars.precompile(tmpl404))());
    const template = Handlebars.template(precompiled);

    return template({
        goToChatLink: AppLink(props.link),
    });
};
