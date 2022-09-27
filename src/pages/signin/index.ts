import Block from '../../utils/Block';
import template from './signin.hbs';
import FormPage from '../../components/formPage';
import * as styles from '../../components/formPage/formPage.scss';

import useUsernameValidator from '../../utils/validators/useUsernameValidator';
import usePasswordValidator from '../../utils/validators/usePasswordValidator';
import { FormType } from '../../components/form';
import AuthController from '../../controllers/AuthController';
import { SigninData } from '../../api/AuthAPI';

export enum editModsProp {
    PASSWORD = 'password',
    DATA = 'data',
    NOTHING = 'nothing'
}

export default class signinPage extends Block {
  constructor() {
    super('div', {});
  }

  init() {
    this.children.form = new FormPage({
      title: 'Вход',
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
      onSubmit: this.onSubmit,
      subbutton: {
        label: 'Нет аккаунта?',
        attrs: {
          class: styles.subbutton,
        },
      },
    });
  }

  onSubmit(form: SigninData & FormType) {
    AuthController.signIn(form);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
