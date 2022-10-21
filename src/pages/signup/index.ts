import Block from '../../utils/Block';
import template from './signup.hbs';
import FormPage from '../../components/formPage';
import styles from '../../components/formPage/formPage.scss';

import useUsernameValidator from '../../utils/validators/useUsernameValidator';
import usePasswordValidator from '../../utils/validators/usePasswordValidator';
import useMailValidator from '../../utils/validators/useMailValidator';
import useNameValidator from '../../utils/validators/useNameValidator';
import usePhoneValidator from '../../utils/validators/usePhoneValidator';
import { Routes } from '../../index';
import { FormType } from '../../components/form';
import { SignupData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';
import Router from '../../utils/Router';
import store from '../../utils/Store';

export default class signupPage extends Block {
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
          click: () => Router.go(Routes.LOGIN),
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
