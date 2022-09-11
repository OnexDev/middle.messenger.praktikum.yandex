import template from './message.hbs';
import * as styles from './message.scss';
import Block from '../../utils/Block';
import { BlockProps } from '../../utils/models/BlockProps';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';

export interface MessageProps extends BlockProps {
    content: string,
    isOwner?: boolean,
}

export default class Message extends Block {
  constructor(props: MessageProps) {
    super('div', getPropsWithAugmentedClasses<MessageProps>(props, [styles.message], [
      props.isOwner ? styles.isOwner : '',
    ]));
  }

  init() {

  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
