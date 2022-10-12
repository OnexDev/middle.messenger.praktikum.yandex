import Block, { BlockProps } from '../../../utils/Block';
import template from './addUserModal.hbs';
import * as styles from './styles.scss';
import ChatsController from '../../../controllers/ChatsController';
import Form, { FormType } from '../../form';
import getPropsWithAugmentedClasses from '../../../utils/atomic/getPropsWithAugmentedClasses';

interface AddUserModalProps extends BlockProps{
    events?: {
        submitCallback?: () => void
    }
}

export default class AddUserModal extends Block {
  constructor(props: AddUserModalProps) {
    super(getPropsWithAugmentedClasses({ ...props, styles }, [styles.createModal], []));
  }

  init() {
    this.children.form = new Form(
      {
        attrs: {
          class: styles.form,
        },
        fields: [{
          name: 'title',
          isFormField: true,
          required: true,
          label: 'Имя пользователя',
        }],
        submitButton: {
          label: 'Добавить',
          isPrimary: true,
        },
        onSubmit: (form: FormType & { title: string }) => {
          ChatsController.create(form.title).then(() => this.props.events?.submitCallback?.());
        },
      },
    );
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
