import Block, { BlockProps } from '../../utils/Block';
import template from './chats.hbs';
import * as styles from './chats.scss';
import ChatSelectorBlock from '../../components/chats/chatSelectorBlock';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import Button from '../../components/button';
import Message, { MessageProps } from '../../components/message';
import Field from '../../components/field';
import { withStore } from '../../utils/Store';
import { Chat } from '../../api/ChatsAPI';

interface ChatsProps extends BlockProps{
    currentChat: {
        avatar: string,
        title: string,
        messages: MessageProps[],
    },
    chatList: Chat[]
}

export class ChatsPage extends Block {
  constructor(props: ChatsProps) {
    super(getPropsWithAugmentedClasses<ChatsProps>(
      { ...props, styles },
      [styles.chatsPage],
      [],
    ));
  }

  init() {
    this.children.profileButton = new Button({
      label: 'Профиль >',
      attrs: {
        class: styles.profileButton,
      },
      events: {
        click: () => {
          console.log('profile');
        },
      },
    });

    this.childrenCollection.messages = this.props.currentChat.messages.map(
      (message: MessageProps) => new Message(message),
    );

    this.childrenCollection.chats = [
      ...this.props.chatList.map((chat: Chat) => new ChatSelectorBlock({
        avatar: chat.avatar,
        title: chat.title,
        subtitle: chat.last_message.content,
        meta: { time: chat.last_message.time, count: chat.unread_count },
      })),
    ];

    this.children.messageField = new Field({
      placeholder: 'Сообщение...',
      name: 'message',
      required: true,
      validator: (value) => value.length > 0,
      attrs: {
        class: styles.messageField,
      },
    });
    this.children.messageButton = new Button(
      {
        label: '',
        isPrimary: false,
        attrs: {
          class: styles.messageButton,
        },
        slots: {
          after: '<img src="pushButton.png"/>',
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({ chatList: [...state.chats || []] }));
export default withChats(ChatsPage);
