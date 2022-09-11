import template from './field.hbs';
import * as styles from './field.scss';
import Block from '../../utils/Block';
import { BlockProps } from '../../utils/models/BlockProps';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';

interface FieldProps extends BlockProps{
    label?: string,
    placeholder?: string,
    name: string,
    required: boolean,
    isFormField?: boolean,

    errors?: string[],
    events?: {
        click: () => void;
    }
}

export default class Field extends Block {
  constructor(props: FieldProps) {
    super('div', getPropsWithAugmentedClasses<FieldProps>(
      {
        ...props,
      },
      [styles.field],
      [
        props.isFormField ? styles.formField : '',
        props.errors && props.errors.length > 0 ? styles.hasError : '',
      ],
    ));
  }

  init() {
    this.props.id = this.id;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
