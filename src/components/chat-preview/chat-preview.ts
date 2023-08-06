import { Block } from '../../core/Block';
import { ChatEntity } from '../../types/chat.types';
import chatPreviewTemplate from './chat-preview-tmpl';
import { State, withStore } from '../../core/Store';

interface ChatPreviewProps {
  chat: ChatEntity,
  activeChat?: ChatEntity,
}
export class BaseChatPreview extends Block<ChatPreviewProps> {
  constructor(props: ChatPreviewProps) {
    super({ ...props });
  }

  render(): DocumentFragment {
    return this.compile(chatPreviewTemplate, { ...this.props });
  }
}

function mapStateToProps(state: State) {
  return {
    activeChat: state.activeChat,
  };
}

export const ChatPreviewWithStore = withStore(mapStateToProps)(BaseChatPreview);
