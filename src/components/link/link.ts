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
    super('a', {...props});

    this.props.events = {
      focusin: (e: Event): void => this.onFocus(e),
      focusout: (e: Event): void => this.onBlur(e),
    };
  }

  render(): DocumentFragment {
    return this.compile(linkTemplate, this.props);
  }

  onFocus = (e: Event): void => {
    console.log('onFocus e', e);
    // isValidate(e, this.element!, '.form__error', 'show')
  };

  onBlur = (e: Event): void => {
    console.log('onBlur e', e);
    // isValidate(e, this.element!, '.form__error', 'show')
  };
}
