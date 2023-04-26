import Block from '../../core/block';
import buttonTemplate from './button-tmpl';

interface Props {
  attr?: Record<string, string>,
  text: string,
  events?: {
    submit?: (e: Event) => void;
    click?: (e: Event) => void;
  },
}

export default class Button extends Block<Props> {
  constructor(props: Props) {
    super('button', {...props});
  }

  render(): DocumentFragment {
    return this.compile(buttonTemplate, this.props);
  }
}
