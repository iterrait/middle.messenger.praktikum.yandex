import {Block} from '../../core/Block';

import BaseLink from '../../components/link/link';

import page404Template from './404-tmpl';

interface Props {
  goToChatLink: Block;
  events?: {
    submit: (e: Event) => void;
  };
}

const data = {
  link: {
    text: 'Назад к чатам',
    attr: {
      href: '/chat',
      class: 'link',
    },
  },
};

class Page404 extends Block<Props> {
  constructor(props: Props) {
    super( { ...props });
    this.element?.classList.add('plug');
  }

  render(): DocumentFragment {
    return this.compile(page404Template, this.props);
  }
}

export default new Page404({
  goToChatLink: new BaseLink(data.link),
});
