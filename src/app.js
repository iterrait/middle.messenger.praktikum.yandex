import { ChangePasswordPage } from './pages/change-password/change-password';
import { Chat } from './pages/chat/chat';
import { Main } from './pages/main/main';
import { ProfilePage } from './pages/profile/profile';
import { SignInPage } from './pages/sign-in/sign-in';
import { SignUpPage } from './pages/sign-up/sign-up';
import { Page404 } from './pages/404/404';
import { Page500 } from './pages/500/500';

export const App = () => {
    switch (window.location.pathname) {
        case '/change-password':
            return ChangePasswordPage();
        case '/chat':
            return Chat();
        case '/sign-in':
            return SignInPage();
        case '/sign-up':
            return SignUpPage();
        case '/profile':
            return ProfilePage();
        case '/404':
            return Page404();
        case '/500':
            return Page500();
        default:
            return Main();
    }
}
