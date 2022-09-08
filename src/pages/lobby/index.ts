import Block from '../../utils/Block';
import template from './lobby.hbs';
import Button from '../../components/Button';
import * as styles from './lobby.scss';

interface HomePageProps {
    title: string;
}

export default class HomePage extends Block {
  constructor(props: HomePageProps) {
    super('div', { props, styles });
  }

  init() {
    this.children.button = new Button({
      label: 'Click me',
      isPrimary: true,
      events: {
        click: () => console.log('clicked'),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
