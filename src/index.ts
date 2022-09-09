import htmlPage404 from './pages/messages/404/404.hbs';
import htmlPage500 from './pages/messages/500/500.hbs';

import auth from './pages/authentiaction/authentiaction.hbs';
import registration from './pages/registration/registation.hbs';
import profile from './pages/profile/profile.hbs';

import LobbyPage from './pages/lobby';
import ChatsPage from './pages/chats';
import './components/button/index.ts';
import './components/message/index.ts';

const router = (app: Element, pathname: string) => {
  if (pathname === '/500.html') {
    app.innerHTML = htmlPage500({ code: 500 });
  } else if (pathname === '/chats.html') {
    const chatsPage = new ChatsPage({

    });
    app.append(chatsPage.getContent()!);
    chatsPage.dispatchComponentDidMount();
  } else if (
    pathname.startsWith('/5')
    && pathname.replace(/[^+\d]/g, '').length === 3
    && pathname.endsWith('.html')
  ) {
    app.innerHTML = htmlPage500({ code: pathname.replace(/[^+\d]/g, '') });
  } else if (pathname === '/') {
    const lobbyPage = new LobbyPage({ title: 'Home page' });
    app.append(lobbyPage.getContent()!);
    lobbyPage.dispatchComponentDidMount();
  } else if (pathname === '/auth.html') {
    app.innerHTML = auth();
  } else if (pathname === '/registration.html') {
    app.innerHTML = registration();
  } else if (pathname === '/profile.html') {
    app.innerHTML = profile();
  } else if (pathname === '/profile2.html') {
    app.innerHTML = profile({ isEditMode: true });
  } else if (pathname === '/profile3.html') {
    app.innerHTML = profile({ isPasswordEditMode: true });
  } else {
    app.innerHTML = htmlPage404();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  if (app === null) {
    throw new Error('#app element does not exist');
  }

  router(app, window.location.pathname);
});
