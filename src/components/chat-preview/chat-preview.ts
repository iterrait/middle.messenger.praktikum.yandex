import { Block } from '../../core/block';
import { ChatEntity } from '../../types/chat.types';
import chatTemplate from './chat-tmpl';

export class BaseChat extends Block<ChatEntity> {

  constructor(props: ChatEntity) {
    super({ ...props });
  }

  render(): DocumentFragment {
    return this.compile(chatTemplate, { ...this.props});
  }
}
