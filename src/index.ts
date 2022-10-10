import LobbyPage from './pages/lobby';

import './components/button/index.ts';
import './components/message/index.ts';

import { ProfilePage } from './pages/profile';
import Router from './utils/Router';
import signinPage from './pages/signin';
import signupPage from './pages/signup';
import AuthController from './controllers/AuthController';
import store from './utils/Store';
import { ChatsPage } from './pages/chats';

export enum Routes {
    INDEX = '/index',
    REGISTER = '/sign-up',
    LOGIN = '/',
    MESSENGER = '/messenger',
    SETTINGS = '/settings',
    PROFILE = '/profile',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.INDEX, LobbyPage)
    .use(Routes.REGISTER, signupPage)
    .use(Routes.LOGIN, signinPage)
    .use(Routes.MESSENGER, ChatsPage, () => store.getState().user !== undefined)
    .use(Routes.SETTINGS, LobbyPage, () => store.getState().user !== undefined)
    .use(Routes.PROFILE, ProfilePage, () => store.getState().user !== undefined);
  await AuthController.fetchUser();

  Router.start();
});
