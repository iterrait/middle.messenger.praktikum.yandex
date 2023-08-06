import { Block } from '../../core/Block';
import linkTemplate from './link-tmpl';

interface Props {
  text: string,
  attr: {
    href?: string;
    class?: string;
  }
  events?: {
    click?: (event: MouseEvent) => void;
  },
}

export default class BaseLink extends Block<Props> {
  constructor(props: Props) {
    super({ ...props });
  }

  render(): DocumentFragment {
    return this.compile(linkTemplate, this.props);
  }
}
