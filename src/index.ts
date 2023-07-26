import './styles/index.scss';

import AuthController from './controllers/auth-controller';
import { BaseChangePasswordPage } from './pages/change-password/change-password';
import { ChatListPage } from './pages/chat-list/chat-list';
import { SettingsPage } from './pages/settings/settings';
import { SignInPage } from './pages/sign-in/sign-in';
import { SignUpPage } from './pages/sign-up/sign-up';
import router from './core/router.ts';

enum Routes {
  Index = '/',
  ChangePassword = '/change-password',
  Chat = '/messenger',
  Register = '/sign-up',
  Page404 = '/404',
  Page500 = '/500',
  Settings = '/settings',
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, SignInPage)
    .use(Routes.Register, SignUpPage)
    .use(Routes.Chat, ChatListPage)
    .use(Routes.ChangePassword, BaseChangePasswordPage)
    .use(Routes.Settings, SettingsPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser().then(() => {
      router.start();

      if (!isProtectedRoute) {
        router.go(Routes.Chat);
      }
    });
  } catch (e) {
    console.log(e, 'Here')
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }
});
