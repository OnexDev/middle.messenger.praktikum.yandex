import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './button.hbs';
import * as styles from './button.scss';

Handlebars.registerPartial('button', (props) => template({ ...props, styles }));
