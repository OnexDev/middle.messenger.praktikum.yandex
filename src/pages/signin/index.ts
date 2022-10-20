import Block from '../../utils/Block';
import template from './signin.hbs';
import FormPage from '../../components/formPage';
import styles from '../../components/formPage/formPage.scss';

import useUsernameValidator from '../../utils/validators/useUsernameValidator';
import usePasswordValidator from '../../utils/validators/usePasswordValidator';
import { FormType } from '../../components/form';
import AuthController from '../../controllers/AuthController';
import { SigninData } from '../../api/AuthAPI';
import { Routes } from '../../index';
import Router from '../../utils/Router';
import store from "../../utils/Store";

export default class signinPage extends Block {
  constructor() {
    super({});
  }

  init() {
    AuthController.fetchUser().then(() => {
      if(store.getState().user){
          Router.go(Routes.MESSENGER)
      }
    });

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
        events: {
          click: () => Router.go(Routes.REGISTER),
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
