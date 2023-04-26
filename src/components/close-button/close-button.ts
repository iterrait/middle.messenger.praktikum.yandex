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
    super('button', {...props});

    this.props.events = {
      focusin: (e: Event): void => this.onFocus(e),
      focusout: (e: Event): void => this.onBlur(e),
    };
  }

  render(): DocumentFragment {
    return this.compile(null, this.props);
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
