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
import './utils/scss/global.scss'
import errorPage from "./pages/errorPage";

export enum Routes {
    INDEX = '/index',
    REGISTER = '/sign-up',
    LOGIN = '/',
    MESSENGER = '/messenger',
    SETTINGS = '/settings',
    PROFILE = '/profile',
    error404 = '/404',
    error5xx = '/500'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.INDEX, LobbyPage)
    .use(Routes.REGISTER, signupPage)
    .use(Routes.LOGIN, signinPage)
    .use(Routes.error404, errorPage)
    .use(Routes.error5xx, errorPage)
    .use(Routes.MESSENGER, ChatsPage, () => store.getState().user !== undefined)
    .use(Routes.SETTINGS, LobbyPage, () => store.getState().user !== undefined)
    .use(Routes.PROFILE, ProfilePage, () => store.getState().user !== undefined);
  await AuthController.fetchUser();

  Router.start();
});
