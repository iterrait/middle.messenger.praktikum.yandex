import { Block } from '../../core/block';
import {ChatEntity, MessageEntity} from '../../types/chat.types';
import activeChatTemplate from './active-chat-tmpl';
import { State, withStore } from '../../core/Store';
import { BaseOverflowMenuWithStore } from '../overflow-menu/overflow-menu';

interface ActiveChatProps {
  activeChat?: ChatEntity,
  messages: MessageEntity[];
}

export class ActiveChatWithStore extends Block<ActiveChatProps> {
  constructor(props: ActiveChatProps) {
    super({ ...props });
  }

  init(): void {
    this.children.overflowMenu = new BaseOverflowMenuWithStore({});
  }

  render(): DocumentFragment {
    return this.compile(activeChatTemplate, { ...this.props });
  }

  componentDidMount(): void {}
}

function mapStateToProps(state: State) {
  return {
    activeChat: state.activeChat,
    messages: state.messages[state.activeChat?.id],
    chats: state.chats,
  };
}

export const CurrentChatWithStore = withStore(mapStateToProps)(ActiveChatWithStore);
