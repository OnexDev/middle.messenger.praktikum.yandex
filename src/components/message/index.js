import template from './message.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';
import styles from './message.scss'

Handlebars.registerPartial('message', (props) => template({...props, styles}))