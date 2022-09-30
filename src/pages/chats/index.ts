import Block, { BlockProps } from '../../utils/Block';
import template from './chats.hbs';
import * as styles from './chats.scss';
import ChatSelectorBlock, { ChatSelectorProps } from '../../components/chats/chatSelectorBlock';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import Button from '../../components/button';
import Message, { MessageProps } from '../../components/message';
import Field from '../../components/field';
import { withStore } from '../../utils/Store';

interface ChatsProps extends BlockProps{
    currentChat: {
        avatar: string,
        title: string,
        messages: MessageProps[],
    },
    chatList: ChatSelectorProps[]
}

export class ChatsPage extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super('div', getPropsWithAugmentedClasses<ChatsProps>(
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
      ...this.props.chatList.map((chat: ChatSelectorProps) => new ChatSelectorBlock(chat)),
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

const withChats = withStore((state) => ({ chats: [...state.chats || []] }));
export default withChats(ChatsPage);
