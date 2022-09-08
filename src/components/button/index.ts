import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './button.hbs';
import * as styles from './button.scss';
import Block from '../../utils/Block';

interface ButtonProps {
    label: string,
    isPrimary?: boolean,
    styles?: [],
    events: {
        click: () => void;
    }
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', { ...props, styles });
  }

  render() {
    return this.compile(template, this.props);
  }
}

Handlebars.registerPartial('button', (props: ButtonProps) => template({ ...props, styles }));
