import Block, { BlockProps } from '../../utils/Block';
import template from './chats.hbs';
import * as styles from './chats.scss';
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

type chatTransformerOverload = {
    (chat:Chat): ChatSelectorProps,
}

export const chatTransformer: chatTransformerOverload = (chat: Chat): ChatSelectorProps => ({
  id: chat.id,
  avatar: chat.avatar,
  title: chat.title,
  subtitle: chat.last_message?.content,
  meta: { time: chat.last_message?.time, count: chat.unread_count },
  events: {
    click: () => ChatsController.selectChat(chat.id),
  },
});

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

    this.children.createChatModal = new Modal({
      template: new CreateChatModal({
        events: {
          submitCallback: () => this.toggleChatModal('close'),
        },
      }),
      wrapper: true,
    });

    this.children.messangerBlock = new MessangerBlock({ createChatModal: () => this.children.createChatModal });
  }

  private createChats(props: ChatsProps) {
    this.childrenCollection.chats = props.chatList.map((chat: Chat) => new ChatSelector(
      chatTransformer(chat),
    ));
  }

  protected componentDidUpdate(oldProps: ChatsProps, newProps: ChatsProps): boolean {
    const isEqualArray = <T>(array: T[], other: T[]) => array.length === other.length
        && array.every((v, i) => v === other[i]);

    if (!isEqualArray(oldProps.chatList, newProps.chatList)) {
      this.createChats(newProps);
    }

    return true;
  }

  toggleChatModal(action: 'open' | 'close') {
    if (action === 'open') {
      (this.children.createChatModal as Modal).open();
    } else {
      (this.children.createChatModal as Modal).close();
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
