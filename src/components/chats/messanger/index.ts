import * as styles from './messanger.scss';

import Block, { BlockProps } from '../../../utils/Block';
import getPropsWithAugmentedClasses from '../../../utils/atomic/getPropsWithAugmentedClasses';
import { withStore } from '../../../utils/Store';
import MessagesController, { Message as MessageInfo } from '../../../controllers/MessagesController';
import Message, { MessageProps } from '../../message';
import getShortTimeString from '../../../utils/atomic/getShortTimeString';
import Button from '../../button';

import Field from '../../field';
import Input from '../../input';
import LoadingImage from '../../image';
import template from './messanger.hbs';
import { Chat } from '../../../api/ChatsAPI';
import { chatTransformer } from '../../../pages/chats';
import Modal from '../../modal';

export interface MessangerProps extends BlockProps{
    createChatModal?: ()=>Modal;
    messages: MessageInfo[],
    userId?: number,
    currentChat?: Chat & {
        messages: MessageProps[],
    },
}

const messageTransformer = (message: MessageInfo, ownerId: number): MessageProps => ({
  content: message.content,
  isOwner: message.user_id === ownerId,
  time: getShortTimeString(message.time),
});

class MessangerBase extends Block {
  constructor(props: MessangerProps) {
    super(getPropsWithAugmentedClasses<MessangerProps>(
      props,
      [styles.main],
      [],
    ), 'main');
  }

  init() {
    if (this.props.selectedChat && this.props.messages) {
      this.createMessages(this.props);
    }

    this.children.avatarImage = new LoadingImage({
      attrs: {
        class: styles.avatar, src: this.props.currentChat?.avatar, width: '34px', height: '34px',
      },
    });

    this.children.addContact = new Button({
      label: 'создайте новый.',
      events: {
        click: () => {
          console.log(this.props.createChatModal().open());
        },
      },
    });

    this.children.messageField = new Field({
      placeholder: 'Сообщение...',
      name: 'message',
      required: true,
      validator: (value) => value.length > 0,
      attrs: {
        class: styles.messageField,
      },
      events: {
        keypress: (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            this.sendMessage({ props: this.props, children: this.children });
          }
        },
      },
    });
    this.props.optionsVisible = false;
    this.children.optionsButton = new Button({
      label: '',
      attrs: {
        class: styles.options,
      },
      events: {
        click: () => {
          this.props.optionsVisible = true;
        },
      },
      slots: {
        after: `<div class="${styles.optionsIcon}">`
            + `<div class="${styles.dot}"></div>`
            + `<div class="${styles.dot}"></div>`
            + `<div class="${styles.dot}"></div>`
            + '</div>',
      },
    });
    this.childrenCollection.options = [
      new Button({
        label: 'Добавить пользователя',
        events: {
          click: () => {
            this.props.optionsVisible = false;
          },
        },
        attrs: {
          class: styles.option,
        },
        slots: {
          before: '<img src="./plusIcon.png">',
        },
      }),
      new Button({
        label: 'Удалить пользователя',
        events: {
          click: () => {
            this.props.optionsVisible = false;
          },
        },
        attrs: {
          class: styles.option,
        },
        slots: {
          before: '<img src="./plusIcon.png">',
        },
      }),

    ];
    this.children.messageButton = new Button(
      {
        label: '',
        isPrimary: false,
        attrs: {
          class: styles.messageButton,
        },
        events: {
          click: () => this.sendMessage({ props: this.props, children: this.children }),
        },
        slots: {
          after: '<img src="pushButton.png"/>',
        },
      },
    );
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

  private sendMessage(context: {props: MessangerProps, children: Record<string, Block>}) {
    if (!context.props.currentChat) {
      return;
    }
    const input = (context.children.messageField as Field).getFieldValue() as Input;
    const message = input.getValue();
    MessagesController.sendMessage(context.props.currentChat.id, message ?? '');
    input.setValue('');
  }

  protected componentDidUpdate(_: any, newProps: any): boolean {
    this.createMessages(newProps);
    return true;
  }

  private createMessages(props: MessangerProps) {
    this.childrenCollection.messagesCollection = props.messages.map((message: MessageInfo) => new Message(
      messageTransformer(message, this.props.userId),
    ));
  }
}

const withSelectedChats = withStore((state) => ({
  userId: state.user?.id,
  messages: (() => {
    const chatId = state.chats?.selectedChat;
    return !chatId ? [] : (state.messages || {})[chatId] || [];
  })(),
  selectedChat: state.chats?.selectedChat,
  currentChat: (() => {
    const currentChat: Chat | undefined = (state.chats?.data || []).find(({ id }) => id === state.chats?.selectedChat);
    return currentChat ? chatTransformer(currentChat) : undefined;
  })(),
}));

export const Messanger = withSelectedChats(MessangerBase);
