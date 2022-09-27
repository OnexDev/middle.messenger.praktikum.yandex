import Block, { BlockProps } from '../../utils/Block';
import template from './profile.hbs';
import * as styles from './profile.scss';
import Button from '../../components/button';
import ProfileSettingsField from '../../components/profile/profileSettingsField';
import { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import { User } from '../../api/AuthAPI';

export enum editModsProp {
    PASSWORD = 'password',
    DATA = 'data',
    NOTHING = 'nothing'
}

interface ProfileProps extends User {}
const userFields = ['id', 'first_name', 'second_name', 'display_name', 'login', 'avatar', 'email', 'phone'] as Array<keyof ProfileProps>;

class Profile extends Block {
  init() {
    AuthController.fetchUser();
    const isEditMode = this.props.editMode === editModsProp.DATA;
    this.childrenCollection.passwordCredentials = [
      new ProfileSettingsField({
        title: 'Старый пароль',
        value: '',
        field: {
          attrs: {
            required: true,
            value: '',
            name: 'old_password',
            type: 'password',
          },
        },
        isEditMode: true,
        name: 'old_password',
      }),
      new ProfileSettingsField({
        title: 'Новый пароль',
        value: '',
        field: {
          attrs: {
            required: true,
            value: '',
            name: 'new_password',
            type: 'password',
          },
        },
        isEditMode: true,
        name: 'new_password',
      }),
      new ProfileSettingsField({
        title: 'Повтор пароля',
        value: '',
        isEditMode: true,
        field: {
          attrs: {
            required: true,
            value: '',
            name: 'repeat_password',
            type: 'password',
          },
        },
        name: 'repeat_password',
      }),
    ];
    this.childrenCollection.credentials = [
      new ProfileSettingsField({
        title: 'Почта',
        value: this.props.email,
        isEditMode,
        name: 'email',
      }),
      new ProfileSettingsField({
        title: 'Логин',
        value: this.props.login,
        isEditMode,
        name: 'login',
      }),
      new ProfileSettingsField({
        title: 'Имя',
        value: this.props.name,
        isEditMode,
        name: 'first_name',
      }),
      new ProfileSettingsField({
        title: 'Фамилия',
        value: this.props.surname,
        isEditMode,
        name: 'second_name',
      }),
      new ProfileSettingsField({
        title: 'Имя в чате',
        value: this.props.username,
        isEditMode,

        name: 'chat_name',
      }),
      new ProfileSettingsField({
        title: 'Телефон',
        value: this.props.phone,
        isEditMode,
        name: 'phone',
      }),
    ];
    this.children.logoutButton = new Button({
      label: 'Выйти',
      attrs: {
        class: styles.logout,
      },
    });
    this.children.editUserDataButton = new Button({
      label: 'Изменить данные',
    });
    this.children.editPasswordButton = new Button({
      label: 'Изменить пароль',
    });
    this.children.saveButton = new Button({
      isPrimary: true,
      label: 'Сохранить',
    });
  }

  protected componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
    /**
         * Обновляем детей
         */
    (this.childrenCollection.credentials).forEach((field, i) => {
      field.setProps({ value: newProps[userFields[i]] });
    });
    return false;
  }

  render() {
    console.log(this.childrenCollection.credentials);
    return this.compile(template, { ...this.props, styles });
  }
}
const withUser = withStore((state) => ({ ...state.user }));
export const ProfilePage = withUser(Profile);
