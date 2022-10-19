import template from './message.hbs';
import styles from './message.scss';
import Block, { BlockProps } from '../../utils/Block';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';

export interface MessageProps extends BlockProps {
    content: string,
    isOwner?: boolean,
    time: string,
}

export default class Message extends Block {
  constructor(props: MessageProps) {
    super(getPropsWithAugmentedClasses<MessageProps>(props, [styles.message], [
      props.isOwner ? styles.isOwner : '',
    ]));
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
