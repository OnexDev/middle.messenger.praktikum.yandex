import Block from '../../utils/Block';
import template from './lobby.hbs';
import Button from '../../components/Button';
import * as styles from './lobby.scss';
import Message from '../../components/Message';

interface HomePageProps {
    title: string;
}

export default class HomePage extends Block {
  constructor(props: HomePageProps) {
    super('div', { props, styles });
  }

  init() {
    this.children.ownerMessage = new Message({
      content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — '
              + 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\n'
              + 'Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все т'
              + 'ушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали '
              + 'только кассеты с пленкой.\n'
              + '\n'
              + 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ра'
              + 'кету они так никогда и не попали. Всего их было произведено 25'
              + ' штук, одну из них недавно продали на аукционе за 45000 евро.',
      isOwner: true,
    });
    this.children.message = new Message({
      content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — '
          + 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\n'
          + 'Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все т'
          + 'ушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали '
          + 'только кассеты с пленкой.\n'
          + '\n'
          + 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ра'
          + 'кету они так никогда и не попали. Всего их было произведено 25'
          + 'штук, одну из них недавно продали на аукционе за 45000 евро.',
    });
    this.children.button = new Button({
      label: 'Click me',
      isPrimary: true,
      attrs: {
        class: 'fff',
      },
      events: {
        click: () => console.log('clicked'),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
