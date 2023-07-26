import { Block } from '../../core/block';
import { ChatEntity } from '../../types/chat.types';
import currentChatTemplate from './current-chat-tmpl';
import { State, withStore } from '../../core/Store';

interface CurrentChatProps {
  currentChat?: ChatEntity,
}
export class ActiveChatWithStore extends Block<CurrentChatProps> {
  constructor(props: CurrentChatProps) {
    super({ ...props });
  }

  render(): DocumentFragment {
    return this.compile(currentChatTemplate, {...this.props});
  }
}

function mapStateToProps(state: State) {
  return {
    ...state.activeChat,
  };
}

export const CurrentChatWithStore = withStore(mapStateToProps)(ActiveChatWithStore);
