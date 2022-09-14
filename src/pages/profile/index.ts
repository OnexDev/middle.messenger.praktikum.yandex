import Block from '../../utils/Block';
import template from './profile.hbs';
import * as styles from './profile.scss';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import Button from '../../components/button';
import { BlockProps } from '../../utils/models/BlockProps';
import ProfileSettingsField from '../../components/profile/profileSettingsField';

export enum editModsProp {
    PASSWORD = 'password',
    DATA = 'data',
    NOTHING = 'nothing'
}

export interface ProfileProps extends BlockProps{
    editMode: editModsProp,
    // TODO: Remove this shit.
    isEditMode: boolean,
    isPasswordEditMode: boolean
    // =======================
    user: {
        avatar: string,
        mail: string,
        login: string,
        name: string,
        surname: string,
        username: string,
        phone: string,
    }
}

export default class ProfilePage extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super('div', getPropsWithAugmentedClasses<ProfileProps>(
      { ...props, styles },
      [styles.profile],
      [],
    ));
  }

  init() {
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
        value: this.props.user.mail,
        isEditMode,
        name: 'email',
      }),
      new ProfileSettingsField({
        title: 'Логин',
        value: this.props.user.login,
        isEditMode,
        name: 'login',
      }),
      new ProfileSettingsField({
        title: 'Имя',
        value: this.props.user.name,
        isEditMode,

        name: 'first_name',
      }),
      new ProfileSettingsField({
        title: 'Фамилия',
        value: this.props.user.surname,
        isEditMode,

        name: 'second_name',
      }),
      new ProfileSettingsField({
        title: 'Имя в чате',
        value: this.props.user.username,
        isEditMode,

        name: 'chat_name',
      }),
      new ProfileSettingsField({
        title: 'Телефон',
        value: this.props.user.phone,
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

  render() {
    return this.compile(template, this.props);
  }
}
