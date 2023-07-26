import Router from './core/routing/router';
import ChatPage from './pages/chat/chat';
import Page404 from './pages/404/404';
import Page500 from './pages/500/500';
import ProfilePage from './pages/profile/profile';
import SignInPage from "./pages/sign-in/sign-in";
import SignUpPage from "./pages/sign-up/sign-up";

// const router = new Router("main");
//
// router
//     .use("/", SignInPage)
//     .use("/sign-up", SignUpPage)
//     .use("/profile", ProfilePage)
//     .use("/chat", ChatPage)
//     .use("/500", Page500)
//     .setFallBack("/404", Page404)
//     .start();

import { Profile } from './pages/Profile';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import router from './core/Router';
import AuthController from './controllers/auth-controllers';

enum Routes {
  Index = '/',
  Register = '/signup',
  Profile = '/profile'
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, SignIn)
    .use(Routes.Register, SignUp)
    .use(Routes.Profile, Profile)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {

    await AuthController.fetchUser();

    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.Profile);
    }
  } catch (e) {
    console.log(e, 'Here')
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }
});
