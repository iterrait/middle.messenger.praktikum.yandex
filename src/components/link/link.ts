import Block from '../../core/block';
import linkTemplate from './link-tmpl';

interface Props {
  text: string,
  attr: {
    href: string;
    class?: string;
  }
  events?: {
    focusin: (e: Event) => void;
    focusout: (e: Event) => void;
  },
}

export default class Link extends Block<Props> {
  constructor(props: Props) {
    super('a', { ...props });
  }

  render(): DocumentFragment {
    return this.compile(linkTemplate, this.props);
  }
}
