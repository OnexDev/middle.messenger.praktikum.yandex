// import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './button.hbs';
import * as styles from './button.scss';
import Block from '../../utils/Block';

interface ButtonProps {
    label: string,
    isPrimary?: boolean,
    styles?: [],
    attrs?:{
        class: string;
    },
    events: {
        click: () => void;
    }
}
const computedClass = (props: ButtonProps) => {
  const baseInstance = props.attrs?.class;
  const defaultInstance = styles.button;
  const computedInstance = [
    props.isPrimary ? styles.primary : false,
  ];

  return [defaultInstance, computedInstance, baseInstance].join(' ');
};

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', {
      ...props,
      attrs: {
        ...props.attrs,
        class: computedClass(props),
      },
    });
  }

  init() {

  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
