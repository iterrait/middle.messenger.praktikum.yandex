import { Block } from './block';
import {ChatEntity, MessageEntity} from '../types/chat.types';
import EventBus from './event-bus';
import { IUser } from '../types/auth.types';
import { set } from '../utils/actions';
import { StorageEvent } from '../types/chat.types'

export interface State {
  chats?: ChatEntity[],
  user?: IUser;
  activeChat?: ChatEntity;
  activeChatUsers?: IUser[];
  messages: Record<number, MessageEntity[]>;
}

class Store extends EventBus {
  private state: State = {
    messages: {},
  };

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StorageEvent.UpdateState, this.state);
  }
}

export const store = new Store();

export function withStore(mapStateToProps: (state: State) => any) {
  return (Component: typeof Block) => {
    return class extends Component {
      constructor(props: any) {
        super({ ...props, ...mapStateToProps(store.getState()) });

        store.on(StorageEvent.UpdateState, () => {
          const propsFromState = mapStateToProps(store.getState());
          this.setProps(propsFromState);
        });
      }
    }
  }
}

export default store;
