import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import {Chat} from "./pages/chat/chat";

export const App = () => {
    switch (window.location.pathname) {
        case '/sign-in':
            return SignIn();
        case '/sign-up':
            return SignUp();
        case '/chat':
            return Chat();
        default:
            return SignIn();
    }
}
