import template from './authentiaction.hbs';
import * as styles from './authentiaction.scss';

import Form from '../../components/form';
import Block from '../../utils/Block';
import useUsernameValidator from '../../utils/validators/useUsernameValidator';
import usePasswordValidator from '../../utils/validators/usePasswordValidator';
import Button from '../../components/button';

export default class AuthPage extends Block {
  constructor(props: {}) {
    super('div', { ...props, attrs: { class: styles.auth }, styles });
  }

  init() {
    this.children.form = new Form(
      {
        attrs: {
          class: styles.form,
        },
        fields: [
          {
            name: 'login',
            required: true,
            label: 'Логин',
            isFormField: true,
            validator: useUsernameValidator,
          },
          {
            name: 'password',
            required: true,
            label: 'Пароль',
            isFormField: true,
            type: 'password',
            validator: usePasswordValidator,
          },
        ],
        submitButton: {
          label: 'Авторизоваться',
          isPrimary: true,
        },
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
