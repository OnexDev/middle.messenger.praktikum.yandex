import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './button.hbs';
import * as styles from './button.scss';

interface ButtonProps {
    label: string,
    isPrimary: string,
    events: {
        click: () => void;
    }
}

Handlebars.registerPartial('button', (props: ButtonProps) => template({ ...props, styles }));
