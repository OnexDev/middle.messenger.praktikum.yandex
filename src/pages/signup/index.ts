import Block from '../../utils/Block';
import template from './signup.hbs';
import FormPage from '../../components/formPage';
import * as styles from '../../components/formPage/formPage.scss';

import useUsernameValidator from '../../utils/validators/useUsernameValidator';
import usePasswordValidator from '../../utils/validators/usePasswordValidator';
import useMailValidator from '../../utils/validators/useMailValidator';
import useNameValidator from '../../utils/validators/useNameValidator';
import usePhoneValidator from '../../utils/validators/usePhoneValidator';
import router from '../../utils/Router';
import { Routes } from '../../index';
import { FormType } from '../../components/form';
import { SignupData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';

export enum editModsProp {
    PASSWORD = 'password',
    DATA = 'data',
    NOTHING = 'nothing'
}

export default class signupPage extends Block {
  constructor() {
    super('div', {});
  }

  init() {
    this.children.form = new FormPage({
      title: 'Регистрация',
      fields: [
        {
          name: 'email',
          required: true,
          label: 'Почта',
          isFormField: true,
          validator: useMailValidator,
        },
        {
          name: 'login',
          required: true,
          label: 'Логин',
          isFormField: true,
          validator: useUsernameValidator,
        }, {
          name: 'first_name',
          required: true,
          label: 'Имя',
          isFormField: true,
          validator: useNameValidator,
        },
        {
          name: 'second_name',
          required: true,
          label: 'Фамилия',
          isFormField: true,
          validator: useNameValidator,
        }, {
          name: 'phone',
          required: true,
          label: 'Телефон',
          isFormField: true,
          validator: usePhoneValidator,
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
        label: 'Зарегистрироваться',
        isPrimary: true,
      },
      onSubmit: this.onSubmit,
      subbutton: {
        label: 'Войти',
        events: {
          click: () => router.go(Routes.LOGIN),
        },
        attrs: {
          class: styles.subbutton,
        },
      },
    });
  }

  onSubmit(form: SignupData & FormType) {
    AuthController.signUp(form);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
