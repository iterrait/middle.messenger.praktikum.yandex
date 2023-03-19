import * as Handlebars from "handlebars";

import { signInTmpl } from './sign-in-tmpl';

export const SignIn = () => {
    return Handlebars.compile(signInTmpl)();
};
