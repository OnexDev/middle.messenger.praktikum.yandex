import template from './button.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';
import styles from './button.scss'

Handlebars.registerPartial('button', (props) => template({...props, styles}))