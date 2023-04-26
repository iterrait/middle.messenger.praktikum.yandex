import Block from '../../core/block';
import chatPreviewTemplate from './chat-preview-tmpl';

interface Props {
  firstname: string,
  lastname: string,
  message: string,
  time: string,
  count: number,
  events?: {
    click?: (e: Event) => void;
  },
}

export default class ChatPreview extends Block<Props> {
  constructor(props: Props) {
    super('div', {...props});
    this.element?.classList.add('chat-preview');
  }

  render(): DocumentFragment {
    return this.compile(chatPreviewTemplate, this.props);
  }
}
