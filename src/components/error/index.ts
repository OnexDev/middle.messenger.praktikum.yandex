import * as styles from './fieldErrors.scss';
import Block, { BlockProps } from '../../utils/Block';
import template from './fieldErrors.hbs';

export interface FieldErrorsProps extends BlockProps{
    errors?: string[],
}

export default class FieldErrors extends Block<FieldErrorsProps> {
  constructor(props: FieldErrorsProps) {
    super({
      ...props,
      attrs: {
        class: styles.error,
      },
      styles,
    }, 'div');
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
