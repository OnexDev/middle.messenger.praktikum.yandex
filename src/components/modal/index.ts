import template from './modal.hbs';
import Block, { BlockProps } from '../../utils/Block';
import ModalWrapper from './modalWrapper';
import styles from './styles.scss';

interface ModalProps extends BlockProps{
    template: Block;
    wrapper?: boolean;
}

export default class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super({ ...props });
  }

  public open() {
    this.show();
  }

  public close() {
    this.hide();
  }

  init() {
    this.hide();
    this.children.wrapper = new ModalWrapper({
      attrs: { class: styles.wrapper },
      events: { click: () => this.close() },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
