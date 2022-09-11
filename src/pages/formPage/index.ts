import template from './formPage.hbs';
import * as styles from './formPage.scss';

import Form from '../../components/form';
import Block from '../../utils/Block';

import Button, { ButtonProps } from '../../components/button';

import { FieldProps } from '../../components/field';

interface FormPageProps{
    title: string,
    fields: FieldProps[],
    submitButton: ButtonProps,
}

export default class AuthPage extends Block {
  constructor(props: FormPageProps) {
    super('div', { ...props, attrs: { class: styles.auth }, styles });
  }

  init() {
    this.children.form = new Form(
      {
        attrs: {
          class: styles.form,
        },
        fields: this.props.fields,
        submitButton: this.props.submitButton,
        onSubmit: (form) => {
          console.log(form);
        },
      },
    );
    this.children.subbutton = new Button({
      label: 'Нет аккаунта?',
      attrs: {
        class: styles.subbutton,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
