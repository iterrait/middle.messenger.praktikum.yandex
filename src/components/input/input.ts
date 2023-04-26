import Block from '../../core/block';

import { validateInput } from '../../utils/validator';

import inputTemplate from './input-tmpl';

interface Props {
  attr?: Record<string, string>,
  type: string;
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string | null;
  events?: {
    focusin: (e: Event) => void;
    focusout: (e: Event) => void;
  },
}

export default class Input extends Block<Props> {
  constructor(props: Props) {
    const events = {
      focusin: (e: Event) => this.onFocus(e),
      focusout: (e: Event) => this.onBlur(e),
    };
    super('div', {...props, events});
    this.element?.classList.add('form-control');
  }

  render(): DocumentFragment {
    return this.compile(inputTemplate, this.props);
  }

  validate(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.value.length) {
      this.setProps({
        ...this.props,
        value: input.value,
        error: validateInput(input),
      });
    }
  }

  onFocus(event: Event): void {
    this.validate(event);
  }

  onBlur(event: Event): void {
    this.validate(event);
  }
}
