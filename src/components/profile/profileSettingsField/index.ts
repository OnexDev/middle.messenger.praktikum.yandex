import Block, { BlockProps } from '../../../utils/Block';
import template from './profileSettingsField.hbs';
import styles from './profileSettingsField.scss';
import getPropsWithAugmentedClasses from '../../../utils/atomic/getPropsWithAugmentedClasses';

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
    super(getPropsWithAugmentedClasses<ProfileSettingsFieldProps>(
      { ...props, styles },
      [styles.profileSettingsField],
      [],
    ), 'li');
  }

  init() {
    this.children.input = new Input(getPropsWithAugmentedClasses<InputProps>(
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
