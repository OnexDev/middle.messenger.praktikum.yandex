import * as handlebarsRuntime from 'handlebars/runtime';
import * as handlebars from 'handlebars';

handlebars.registerHelper('compareStrings', (
  firstString: string,
  secondString: string,
  options?: {inverse: boolean},
) => {
  if (options?.inverse) {
    return firstString !== secondString;
  }
  return firstString === secondString;
});

handlebarsRuntime.registerHelper('compareStrings', (
  firstString: string,
  secondString: string,
  options?: {inverse: boolean},
) => {
  if (options?.inverse) {
    return firstString !== secondString;
  }
  return firstString === secondString;
});
