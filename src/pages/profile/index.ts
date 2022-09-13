import Block from '../../utils/Block';
import template from './profile.hbs';
import * as styles from './profile.scss';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import Button from '../../components/button';
import { BlockProps } from '../../utils/models/BlockProps';

interface ProfileProps extends BlockProps{
    avatar: string,
    user: {
        mail:string,
        login: string,
        name: string,
        surname: string,
        username: string,
        phone: string,
    }
}

export default class ChatsPage extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super('div', getPropsWithAugmentedClasses<ProfileProps>(
      { ...props, styles },
      [styles.profile],
      [],
    ));
  }

  init() {
    this.children.logoutButton = new Button({
      label: 'Выйти',
    });
    this.children.editUserDataButton = new Button({
      label: 'Изменить данные',
    });
    this.children.editPasswordButton = new Button({
      label: 'Изменить пароль',
    });
    this.children.saveButton = new Button({
      isPrimary: true,
      label: 'Изменить пароль',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
