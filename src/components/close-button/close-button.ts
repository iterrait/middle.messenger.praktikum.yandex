import Block from '../../core/block';

interface Props {
  attr: {
    class?: string;
  }
  events?: {
    focusin: (e: Event) => void;
    focusout: (e: Event) => void;
  },
}

export default class CloseButton extends Block<Props> {
  constructor(props: Props) {
    super('button', { ...props });
  }

  render(): DocumentFragment {
    return this.compile(null, this.props);
  }
}
