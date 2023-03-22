import { ChangePasswordPage } from './pages/change-password/change-password';
import { ChatPage } from './pages/chat/chat';
import { Main } from './pages/main/main';
import { ProfilePage } from './pages/profile/profile';
import { SignInPage } from './pages/sign-in/sign-in';
import { SignUpPage } from './pages/sign-up/sign-up';
import { Page404 } from './pages/404/404';
import { Page500 } from './pages/500/500';

export const App = () => {
    switch (window.location.pathname) {
        case '/change-password.html':
            return ChangePasswordPage();
        case '/chat.html':
            return ChatPage();
        case '/sign-in.html':
            return SignInPage();
        case '/sign-up.html':
            return SignUpPage();
        case '/profile.html':
            return ProfilePage();
        case '/404.html':
            return Page404();
        case '/500.html':
            return Page500();
        default:
            return Main();
    }
}
