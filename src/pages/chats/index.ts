import Block, { BlockProps } from '../../utils/Block';
import template from './chats.hbs';
import styles from './chats.scss';
import { ChatSelector, ChatSelectorProps } from '../../components/chats/chatSelectorBlock';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import Button from '../../components/button';
import { withStore } from '../../utils/Store';
import { Chat } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import Modal from '../../components/modal';
import CreateChatModal from '../../components/chats/createChatModal';
import router from '../../utils/Router';
import { Routes } from '../../index';
import { Message as MessageInfo } from '../../controllers/MessagesController';
import { User } from '../../api/AuthAPI';
import { Messanger as MessangerBlock } from '../../components/chats/messanger';
import { AddUserModal } from '../../components/chats/addUserModal';
import { RemoveUserModal } from '../../components/chats/removeUserModal';
import searchIcon from './../../../static/searchIcon.png';


type chatTransformerOverload = {
    (chat:Chat): ChatSelectorProps,
}

export const chatTransformer: chatTransformerOverload = (chat: Chat): ChatSelectorProps => ({
  id: chat.id,
  avatar: chat.avatar,
  title: chat.title,
  subtitle: chat.lastMessage?.content,
  meta: { time: chat.lastMessage?.time, count: chat.unreadCount },
  events: {
    click: () => ChatsController.selectChat(chat.id),
  },
});
export const isEqualArray = <T>(array: T[], other: T[]) => array.length === other.length
    && array.every((v, i) => v === other[i]);
interface ChatsProps extends BlockProps{
    user: User,
    isLoaded: boolean,
    chatList: Chat[],
    messages: MessageInfo[]
}

export class ChatsPageBase extends Block {
  constructor(props: ChatsProps) {
    super(getPropsWithAugmentedClasses<ChatsProps>(
      { ...props, styles },
      [styles.chatsPage],
      [],
    ));
  }

  init() {
    ChatsController.fetchChats();

    this.children.profileButton = new Button({
      label: 'Профиль >',
      attrs: {
        class: styles.profileButton,
      },
      events: {
        click: () => {
          router.go(Routes.PROFILE);
        },
      },
    });

    // Duplicate from Component Did Update
    this.createChats(this.props);
    this.props.searchIcon = searchIcon;
    this.children.createChatModal = new Modal({
      template: new CreateChatModal({
        events: {
          submitCallback: () => this.toggleModal(this.children.createChatModal as Modal, 'close'),
        },
      }),
      wrapper: true,
    });

    this.children.addUserModal = new Modal({
      template: new AddUserModal({
        events: {
          submitCallback: () => this.toggleModal(this.children.addUserModal as Modal, 'close'),
        },
      }),
      wrapper: true,
    });

    this.children.removeUserModal = new Modal({
      template: new RemoveUserModal({
        events: {
          submitCallback: () => this.toggleModal(this.children.removeUserModal as Modal, 'close'),
        },
      }),
      wrapper: true,
    });

    this.children.messangerBlock = new MessangerBlock({
      addUserModal: () => this.children.addUserModal,
      createChatModal: () => this.children.createChatModal,
      removeUserModal: () => this.children.removeUserModal,
    });
  }

  private createChats(props: ChatsProps) {
      console.log(props.chatList)
    this.childrenCollection.chats = props.chatList.map((chat: Chat) => new ChatSelector(
      chatTransformer(chat),
    ));
  }

  protected componentDidUpdate(oldProps: ChatsProps, newProps: ChatsProps): boolean {
    if (Array.isArray(oldProps.chatList) && Array.isArray(newProps.chatList)) {
      if (!isEqualArray(oldProps.chatList, newProps.chatList)) {
        this.createChats(newProps);
      }
    }

    return true;
  }

  toggleModal(modal: Modal, action: 'open' | 'close') {
    if (action === 'open') {
      modal.open();
    } else {
      modal.close();
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({
  chatList: state.chats?.data || [],
  isLoaded: state.chats?.isLoaded,
  error: state.chats?.error,
  user: state.user,
}));

export const ChatsPage = withChats(ChatsPageBase);
