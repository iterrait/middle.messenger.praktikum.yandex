import * as Handlebars from "handlebars";

import { signUpTmpl } from './sign-up-tmpl';

export const SignUp = () => {
    return Handlebars.compile(signUpTmpl)();
};
