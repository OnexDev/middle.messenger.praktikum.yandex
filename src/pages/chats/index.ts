import Block, { BlockProps } from '../../utils/Block';
import template from './chats.hbs';
import * as styles from './chats.scss';
import { ChatSelector, ChatSelectorProps } from '../../components/chats/chatSelectorBlock';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import Button from '../../components/button';
import Message, { MessageProps } from '../../components/message';
import Field from '../../components/field';
import { withStore } from '../../utils/Store';
import { Chat } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import Modal from '../../components/modal';
import CreateChatModal from '../../components/chats/createChatModal';
import router from '../../utils/Router';
import { Routes } from '../../index';
import LoadingImage from '../../components/image';
import MessagesController, { Message as MessageInfo } from '../../controllers/MessagesController';
import Input from '../../components/input';
import { User } from '../../api/AuthAPI';

type chatTransformerOverload = {
    (chat:Chat): ChatSelectorProps,
}

const chatTransformer: chatTransformerOverload = (chat: Chat): ChatSelectorProps => ({
  id: chat.id,
  avatar: chat.avatar,
  title: chat.title,
  subtitle: chat.last_message?.content,
  meta: { time: chat.last_message?.time, count: chat.unread_count },
  events: {
    click: () => ChatsController.selectChat(chat.id),
  },
});

const messageTransformer = (message: MessageInfo, ownerId: number): MessageProps => ({
  content: message.content,
  isOwner: message.user_id === ownerId,
});

interface ChatsProps extends BlockProps{
    currentChat?: Chat & {
        messages: MessageProps[],
    },
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
    this.children.avatarImage = new LoadingImage({
      attrs: {
        class: styles.avatar, src: this.props.currentChat?.avatar, width: '34px', height: '34px',
      },
    });

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

    if (this.props.currentChat && this.props.messages) {
      this.createMessages(this.props);
    }

    // Duplicate from Component Did Update
    this.createChats(this.props);

    this.children.messageField = new Field({
      placeholder: 'Сообщение...',
      name: 'message',
      required: true,
      validator: (value) => value.length > 0,
      attrs: {
        class: styles.messageField,
      },
    });

    this.children.createChatModal = new Modal({
      template: new CreateChatModal({
        events: {
          submitCallback: () => this.toggleChatModal('close'),
        },
      }),
      wrapper: true,
    });

    this.children.addContact = new Button({
      label: 'создайте новый.',
      events: {
        click: () => (this.children.createChatModal as Modal).open(),
      },
    });

    this.children.messageButton = new Button(
      {
        label: '',
        isPrimary: false,
        attrs: {
          class: styles.messageButton,
        },
        events: {
          click: () => {
            if (!this.props.currentChat) {
              return;
            }
            const input = (this.children.messageField as Field).getFieldValue() as Input;
            const message = input.getValue();
            MessagesController.sendMessage(this.props.currentChat.id, message ?? '');
            input.setValue('');
          },
        },
        slots: {
          after: '<img src="pushButton.png"/>',
        },
      },
    );
  }

  private createChats(props: ChatsProps) {
    this.childrenCollection.chats = props.chatList.map((chat: Chat) => new ChatSelector(
      chatTransformer(chat),
    ));
  }

  private createMessages(props: ChatsProps) {
    this.childrenCollection.messages = props.messages.map((message: MessageInfo) => new Message(
      messageTransformer(message, props.user.id),
    ));
  }

  protected componentDidUpdate(oldProps: ChatsProps, newProps: ChatsProps): boolean {
    const isEqualArray = <T>(array: T[], other: T[]) => array.length === other.length
        && array.every((v, i) => v === other[i]);

    if (!isEqualArray(oldProps.chatList, newProps.chatList)) {
      this.createChats(newProps);
    }

    this.createMessages(newProps);

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

const withChats = withStore((state) => {
  const chatId = state.chats?.selectedChat;
  let messages: MessageInfo[];

  if (!chatId) {
    messages = [];
  } else {
    messages = (state.messages || {})[chatId] || [];
  }
  return {
    chatList: state.chats?.data || [],
    isLoaded: state.chats?.isLoaded,
    error: state.chats?.error,
    messages,
    user: state.user,
    currentChat: (() => {
      const currentChat: Chat | undefined = (state.chats?.data || []).find(({ id }) => id === state.chats?.selectedChat);
      return currentChat ? chatTransformer(currentChat) : undefined;
    })(),
  };
});

export const ChatsPage = withChats(ChatsPageBase);
