import Block, { BlockProps } from '../../../utils/Block';
import template from './removeUserModal.hbs';
import * as styles from './removeUserModal.scss';
import getPropsWithAugmentedClasses from '../../../utils/atomic/getPropsWithAugmentedClasses';
import { withStore } from '../../../utils/Store';
import ChatsController from '../../../controllers/ChatsController';
import { User } from '../../../api/AuthAPI';
import Button from '../../button';
import { isEqualArray } from '../../../pages/chats';

interface removeUserModalProps extends BlockProps{
    chatId?: number,
    userList: User[],
    events?: {
        submitCallback?: () => void
    }
}

export default class RemoveUserModalBase extends Block {
  constructor(props: removeUserModalProps) {
    super(getPropsWithAugmentedClasses({ ...props, styles }, [styles.createModal], []));
  }

  createUsers(props: removeUserModalProps) {
    if (props.userList && props.userList.length > 0) {
      this.childrenCollection.users = props.userList.map((user: User) => new Button({
        label: `${user.id} ${user.first_name} ${user.second_name}`,
        slots: {
          // TODO: Must be new LoadingImage
          before: `<img src="${user.avatar}" width="20px" height="20px">`,
        },
        events: {
          click: async () => {
            await ChatsController.removeUserFromChat(this.props.chatId, user.id);
            this.props.submitCallback();
          },
        },
      }));
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    ChatsController.getUsersFromChat(this.props.chatId);

    if (Array.isArray(oldProps.chatList) && Array.isArray(newProps.userList)) {
      if (!isEqualArray(oldProps.userList, newProps.userList)) {
        this.createUsers(newProps);
      }
    }
    return true;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChatId = withStore((state) => ({
  chatId: state.chats?.selectedChat,
  userList: state.chats?.selectedChat ? (state.chats?.userLists || [])[state.chats?.selectedChat] : [],
}));

export const RemoveUserModal = withChatId(RemoveUserModalBase);
