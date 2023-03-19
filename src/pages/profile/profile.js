import * as Handlebars from "handlebars";

import { profileTmpl } from './profile-tmpl';

export const Profile = () => {
    return Handlebars.compile(profileTmpl)();
};
