import Block from '../../../utils/Block';
import template from './profileSettingsField.hbs';
import * as styles from './profileSettingsField.scss';
import getPropsWithAugmentedClasses from '../../../utils/atomic/getPropsWithAugmentedClasses';
import { BlockProps } from '../../../utils/models/BlockProps';
import Input, { InputProps } from '../../input';

interface ProfileSettingsFieldProps extends BlockProps{
    title: string,
    isEditMode?: boolean,
    field?: InputProps,
    value: string,
    name: string,
}

export default class ProfileSettingsField extends Block<ProfileSettingsFieldProps> {
  constructor(props: ProfileSettingsFieldProps) {
    super('li', getPropsWithAugmentedClasses<ProfileSettingsFieldProps>(
      { ...props, styles },
      [styles.profileSettingsField],
      [],
    ));
  }

  init() {
    this.children.field = new Input(getPropsWithAugmentedClasses<InputProps>(
      {
        ...this.props.field,
        attrs: {
          ...this.props.field?.attrs,
          name: this.props.name,
          value: this.props.value,
        },
        styles,
      },
      [
        styles.input,
      ],
      [],
    ));
  }

  render() {
    return this.compile(template, this.props);
  }
}
