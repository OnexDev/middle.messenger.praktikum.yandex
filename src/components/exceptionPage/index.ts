import Block, { BlockProps } from '../../utils/Block';
import template from './exceptionPage.hbs';
import * as styles from './exceptionPage.scss';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import Button, { ButtonProps } from '../button';

interface ExceptionPageProps extends BlockProps{
    code: string,
    title: string,
    return: ButtonProps,
}

export default class ExceptionPage extends Block<ExceptionPageProps> {
  constructor(props: ExceptionPageProps) {
    super('div', getPropsWithAugmentedClasses<ExceptionPageProps>(
      { ...props, styles },
      [styles.messagePage],
      [],
    ));
  }

  init() {
    this.children.returnButton = new Button(this.props.return);
  }

  render() {
    return this.compile(template, this.props);
  }
}
