import * as styles from './fieldErrors.scss';
import Block from '../../utils/Block';
import { BlockProps } from '../../utils/models/BlockProps';
import template from './fieldErrors.hbs';

export interface FieldErrorsProps extends BlockProps{
    errors: string[],
}

export default class FieldErrors extends Block<FieldErrorsProps> {
  constructor(props: FieldErrorsProps) {
    super('div', {
      ...props,
      attrs: {
        class: styles.error,
      },
      styles,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
