import template from './chatSelectorBlock.hbs';
import * as styles from './chatSelectorBlock.scss';

import Block, { BlockProps } from '../../../utils/Block';
import getPropsWithAugmentedClasses from '../../../utils/atomic/getPropsWithAugmentedClasses';
import { withStore } from '../../../utils/Store';

export interface ChatSelectorProps extends BlockProps{
    id: number,
    avatar: string,
    title: string,
    subtitle?: string,
    meta:{
        time?: string,
        count?: number,
    }
    isSelected?: boolean;
    events?: {
        click: () => void;
    }
}

export default class ChatSelectorBase extends Block {
  constructor(props: ChatSelectorProps) {
    super(getPropsWithAugmentedClasses<ChatSelectorProps>(
      props,
      [styles.chatSelectorBlock],
      [],
    ));
  }

  init() {

  }

  render() {
    return this.compile(template, { ...this.props, styles, isSelected: this.props.id === this.props.selectedChat?.id });
  }
}

const withSelectedChats = withStore((state) => ({
  selectedChat: (state.chats?.data || []).find(({ id }) => id === state.chats?.selectedChat),
}));

export const ChatSelector = withSelectedChats(ChatSelectorBase);
