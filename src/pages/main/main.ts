import * as Handlebars from 'handlebars';
import mainTemplate from './main-tmpl';

export default () => {
  return Handlebars.compile(mainTemplate)({});
};
