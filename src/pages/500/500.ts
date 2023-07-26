import { Block } from '../../core/block';

import BaseLink from '../../components/link/link';

import page500Template from './500-tmpl';

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

class Page500 extends Block<Props> {
  constructor(props: Props) {
    super( { ...props });
    this.element?.classList.add('plug');
  }

  render(): DocumentFragment {
    return this.compile(page500Template, this.props);
  }
}

export default new Page500({
  goToChatLink: new BaseLink(data.link),
});
