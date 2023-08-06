import { Block } from '../../core/block';
import inputTemplate from './input-tmpl';
import { validateInput } from '../../utils/validator';

interface InputProps {
  attr?: Record<string, string>,
  type: string;
  name: string;
  id?: string;
  label?: string;
  value?: string | null;
  placeholder?: string;
  error?: string | null;
  events?: {
    focusout?: (e: Event) => void;
    click?: (e: Event) => void;
    change?: (e: Event) => void;
  },
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        ...props.events,
        focusout: (event) => this.onBlur(event),
      }
    });
  }

  render(): DocumentFragment {
    return this.compile(inputTemplate, { ...this.props});
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

  onBlur(event: Event): void {
    this.validate(event);
  }
}
