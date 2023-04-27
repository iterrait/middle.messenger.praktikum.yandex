import Block from '../../core/block';

import mainTemplate from './main-tmpl';
import Link from '../../components/link/link';

interface Props {
  signIn: Block,
  signUp: Block,
  profile: Block,
  changePassword: Block,
  page404: Block,
  page500: Block,
  chat: Block,
  events?: {
    focusin: (e: Event) => void;
    focusout: (e: Event) => void;
  },
}

const data = {
  signIn: {
    attr: {
      href: '/sign-in.html',
    },
    text: 'Sign in',
  },
  signUp: {
    attr: {
      href: '/sign-up.html',
    },
    text: 'Sign up',
  },
  profile: {
    attr: {
      href: '/profile.html',
    },
    text: 'Profile',
  },
  changePassword: {
    attr: {
      href: '/change-password.html',
    },
    text: 'Change password',
  },
  page404: {
    attr: {
      href: '/404.html',
    },
    text: '404',
  },
  page500: {
    attr: {
      href: '/500.html',
    },
    text: '500',
  },
  chat: {
    attr: {
      href: '/chat.html',
    },
    text: 'Chat',
  }
};

class Main extends Block<Props> {
  constructor(props: Props) {
    super('nav', props);
  }

  render(): DocumentFragment {
    return this.compile(mainTemplate, this.props);
  }
}

export default new Main({
  signIn: new Link(data.signIn),
  signUp: new Link(data.signUp),
  profile: new Link(data.profile),
  changePassword: new Link(data.changePassword),
  page404: new Link(data.page404),
  page500: new Link(data.page500),
  chat: new Link(data.chat),
});


