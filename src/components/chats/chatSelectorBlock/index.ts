import template from './chatSelectorBlock.hbs';
import * as styles from './chatSelectorBlock.scss';

import Block, { BlockProps } from '../../../utils/Block';
import getPropsWithAugmentedClasses from '../../../utils/atomic/getPropsWithAugmentedClasses';

export interface ChatSelectorProps extends BlockProps{
    avatar: string,
    title: string,
    subtitle?: string,
    meta:{
        time: string,
        count: number,
    }
    events?: {
        click: () => void;
    }
}

export default class chatSelectorBlock extends Block {
  constructor(props: ChatSelectorProps) {
    super(getPropsWithAugmentedClasses<ChatSelectorProps>(
      props,
      [styles.chatSelectorBlock],
      [],
    ), 'div');
  }

  init() {

  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
