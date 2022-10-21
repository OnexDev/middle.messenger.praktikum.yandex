import Block from '../../utils/Block';
import template from './lobby.hbs';
import styles from './lobby.scss';
import { Routes } from '../../index';
import Button from '../../components/button';
import Router from '../../utils/Router';
import AuthController from '../../controllers/AuthController';

export default class HomePage extends Block {
  constructor() {
    super({ styles });
  }

  init() {
    this.childrenCollection.routes = Object.entries(Routes).map(([key, value]) => new Button(
      {
        label: key,
        events: {
          click: () => Router.go(value),
        },
      },
    ));
    this.children.logout = new Button({
      label: 'logout',
      events: {
        click: () => AuthController.logout(),
      },
    });
  }

  render() {
    return this.compile(template, {});
  }
}
