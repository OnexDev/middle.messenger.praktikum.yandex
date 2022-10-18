import Block, { BlockProps } from '../../../utils/Block';
import template from './addUserModal.hbs';
import * as styles from './addUserModal.scss';
import ChatsController from '../../../controllers/ChatsController';
import Form, { FormType } from '../../form';
import getPropsWithAugmentedClasses from '../../../utils/atomic/getPropsWithAugmentedClasses';
import { withStore } from '../../../utils/Store';

interface AddUserModalProps extends BlockProps{
    chatId: number,
    events?: {
        submitCallback?: () => void
    }
}

export class AddUserModalBase extends Block {
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
          name: 'id',
          isFormField: true,
          required: true,
          label: 'ID пользователя',
        }],
        submitButton: {
          label: 'Добавить',
          isPrimary: true,
        },
        onSubmit: (form: FormType & { id: number }) => {
          ChatsController.addUserToChat(this.props.chatId, form.id).then(() => this.props.events?.submitCallback?.());
        },
      },
    );
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChatId = withStore((state) => ({ chatId: state.chats?.selectedChat }));

export const AddUserModal = withChatId(AddUserModalBase);
