import Block from '../../utils/Block';
import template from './lobby.hbs';
import * as styles from './lobby.scss';

interface HomePageProps {

}

export default class HomePage extends Block {
  constructor(props: HomePageProps) {
    super('div', { props, styles });
  }

  render() {
    return this.compile(template, this.props);
  }
}
