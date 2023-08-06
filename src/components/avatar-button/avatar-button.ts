import { Block } from '../../core/Block';
import buttonTemplate from './avatar-button-tmpl';
import { State, withStore } from '../../core/Store';

interface Props {
  avatar: string | null;
  events: {
    click?: (e: Event) => void;
  },
}

export default class BaseAvatarButton extends Block<Props> {
  constructor(props: Props) {
    super({ ...props });
  }

  render(): DocumentFragment {
    return this.compile(buttonTemplate, this.props);
  }
}

function mapStateToProps(state: State) {
  return {
    avatar: state?.user?.avatar ? `https://ya-praktikum.tech/api/v2/resources${state.user.avatar}` : null,
  };
}

export const AvatarButtonWithStore = withStore(mapStateToProps)(BaseAvatarButton);
