import template from './chatSelectorBlock.hbs';
import styles from './chatSelectorBlock.scss';

import Block, { BlockProps } from '../../../utils/Block';
import getPropsWithAugmentedClasses from '../../../utils/atomic/getPropsWithAugmentedClasses';
import { withStore } from '../../../utils/Store';
import { Chat } from '../../../api/ChatsAPI';
import LoadingImage from '../../image';
import { isEqual } from '../../../utils/helpers';
import getTimeString from '../../../utils/atomic/getShortTimeString';
import getTextWidth from '../../../utils/atomic/getTextWidth';

export interface ChatSelectorProps extends BlockProps{
    id: number,
    avatar: string,
    title: string,
    subtitle?: string,
    meta: {
        time?: string,
        count?: number,
    }
    events?: {
        click: () => void;
    },
    selectedChat?: Chat,
}

class ChatSelectorBase extends Block {
  constructor(props: ChatSelectorProps) {
    super(getPropsWithAugmentedClasses<ChatSelectorProps>(
      props,
      [styles.chatSelectorBlock],
      [],
    ));
  }

  init() {
    this.children.avatarImage = new LoadingImage({ attrs: { src: this.props.avatar, width: '47px', height: '47px' } });
    this.props.timeString = getTimeString(this.props.meta.time);
    this.props.shortSubtitle = (() => {
      const width = getTextWidth(this.props.subtitle, 'font-size:12px;');
      const cellWidth = 193;
      const countOfRows = 2;
      if (width / countOfRows > cellWidth) {
        return `${this.props.subtitle?.slice(0, 42)}...`;
      }
      return this.props.subtitle;
    })();
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    return !isEqual(oldProps, newProps);
  }

  public select() {
    this.getContent()!.classList.add(styles.isSelected);
  }

  public unselect() {
    this.getContent()!.classList.remove(styles.isSelected);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

  componentWasRendered() {
    if (this.props.selectedChat?.id === this.props.id) {
      this.select();
    } else {
      this.unselect();
    }
  }
}

const withSelectedChats = withStore((state) => ({
  selectedChat: (state.chats?.data || []).find(({ id }) => id === state.chats?.selectedChat),
}));

export const ChatSelector = withSelectedChats(ChatSelectorBase);
