import template from './field.hbs';
import * as styles from './button.scss';
import Block from '../../utils/Block';
import { BlockProps } from '../../utils/models/BlockProps';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';

interface FieldProps extends BlockProps{
    label: string,
    isPrimary?: boolean,
    events?: {
        click: () => void;
    }
}

export default class Field extends Block {
  constructor(props: FieldProps) {
    super('div', getPropsWithAugmentedClasses<FieldProps>(props, [styles.button], [
      props.isPrimary ? styles.button : false,
    ]));
  }

  init() {

  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
