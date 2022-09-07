import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './message.hbs';
import * as styles from './message.scss';

Handlebars.registerPartial('message', (props) => template({ ...props, styles }));
