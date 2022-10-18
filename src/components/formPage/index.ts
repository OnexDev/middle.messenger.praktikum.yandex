import template from './formPage.hbs';
import * as styles from './formPage.scss';

import Form, { FormType } from '../form';
import Block, { BlockProps } from '../../utils/Block';

import Button, { ButtonProps } from '../button';

import { FieldProps } from '../field';

export interface FormPageProps extends BlockProps{
    title: string,
    subbutton: ButtonProps,
    fields: FieldProps[],
    submitButton: ButtonProps,
    onSubmit: (form: FormType) => void;
}

export default class FormPage extends Block {
  constructor(props: FormPageProps) {
    super({ ...props, attrs: { class: styles.auth }, styles }, 'div');
  }

  init() {
    this.children.form = new Form(
      {
        attrs: {
          class: styles.form,
        },
        fields: this.props.fields,
        submitButton: this.props.submitButton,
        onSubmit: this.props.onSubmit,
      },
    );
    this.children.subbutton = new Button(this.props.subbutton);
  }

  render() {
    return this.compile(template, this.props);
  }
}
