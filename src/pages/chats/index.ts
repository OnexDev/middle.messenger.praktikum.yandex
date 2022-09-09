import Block from '../../utils/Block';
import template from './chats.hbs';
import * as styles from './chats.scss';
import ChatSelectorBlock from '../../components/chats/chatSelectorBlock'

interface ChatsProps {

}

export default class ChatsPage extends Block {
  constructor(props: ChatsProps) {
    super('div', { props, styles });
  }

  init() {
      this.childrenCollection.chats = [
          new ChatSelectorBlock({
              title: 'login',
              avatar: 'blank.png',
              subtitle: 'ваоповытапотывадлптвыт вадотаывдлтав',
              meta:{
                  time: '11:35',
                  count: 3,
              }
          }),
          new ChatSelectorBlock({
              title: 'Важно!',
              avatar: 'blank.png',
              subtitle: 'Позвони мне, срочно!!',
              meta:{
                  time: '11:35',
                  count: 3,
              }
          }),
          new ChatSelectorBlock({
              title: 'Я чат',
              avatar: 'blank.png',
              subtitle: 'Я сабтайтл',
              meta:{
                  time: '11:35',
                  count: 0,
              }
          }),
      ]
  }

  render() {
    return this.compile(template, this.props);
  }
}
