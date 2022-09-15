import LobbyPage from './pages/lobby';
import ChatsPage from './pages/chats';
import ExceptionPage from './pages/exceptionPage';

import './components/button/index.ts';
import './components/message/index.ts';
import FormPage from './pages/formPage';
import useUsernameValidator from './utils/validators/useUsernameValidator';
import usePasswordValidator from './utils/validators/usePasswordValidator';
import useMailValidator from './utils/validators/useMailValidator';
import useNameValidator from './utils/validators/useNameValidator';
import usePhoneValidator from './utils/validators/usePhoneValidator';
import * as styles from './pages/formPage/formPage.scss';
import ProfilePage, { editModsProp } from './pages/profile';

const router = (app: Element, pathname: string) => {
  if (pathname === '/chats.html') {
    const chatsPage = new ChatsPage({
      currentChat: {
        avatar: 'blank.png',
        title: 'Иван',
        messages: [
          {
            content: 'Ура ура ура',
            isOwner: true,
          },
          {
            content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — '
                    + 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\n'
                    + 'Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все т'
                    + 'ушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали '
                    + 'только кассеты с пленкой.\n'
                    + '\n'
                    + 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ра'
                    + 'кету они так никогда и не попали. Всего их было произведено 25'
                    + ' штук, одну из них недавно продали на аукционе за 45000 евро.',
            isOwner: false,
          },
          {
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
          },
          {
            content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — '
                    + 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\n'
                    + 'Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все т'
                    + 'ушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали '
                    + 'только кассеты с пленкой.\n'
                    + '\n'
                    + 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ра'
                    + 'кету они так никогда и не попали. Всего их было произведено 25'
                    + ' штук, одну из них недавно продали на аукционе за 45000 евро.',
            isOwner: false,
          },
          {
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
          },
        ],
      },
      chatList: [
        {
          title: 'login',
          avatar: 'blank.png',
          subtitle: 'ваоповытапотывадлптвыт вадотаывдлтав',
          meta: {
            time: '11:35',
            count: 3,
          },
        },
        {
          title: 'Важно!',
          avatar: 'blank.png',
          subtitle: 'Позвони мне, срочно!!',
          meta: {
            time: '11:35',
            count: 3,
          },
        },
      ],
    });
    app.append(chatsPage.getContent()!);
    chatsPage.dispatchComponentDidMount();
  } else if (
    pathname.startsWith('/5')
    && pathname.replace(/[^+\d]/g, '').length === 3
    && pathname.endsWith('.html')
  ) {
    const exceptionPage = new ExceptionPage({
      code: pathname.replace(/[^+\d]/g, ''),
      title: 'Мы уже фиксим',
      return: {
        label: 'Назад к чатам',
      },
    });

    app.append(exceptionPage.getContent()!);
    exceptionPage.dispatchComponentDidMount();
  } else if (pathname === '/') {
    const lobbyPage = new LobbyPage({});
    app.append(lobbyPage.getContent()!);
    lobbyPage.dispatchComponentDidMount();
  } else if (pathname === '/auth.html') {
    const authPage = new FormPage({
      title: 'Вход',
      fields: [
        {
          name: 'login',
          required: true,
          label: 'Логин',
          isFormField: true,
          validator: useUsernameValidator,
        },
        {
          name: 'password',
          required: true,
          label: 'Пароль',
          isFormField: true,
          type: 'password',
          validator: usePasswordValidator,
        },
      ],
      submitButton: {
        label: 'Авторизоваться',
        isPrimary: true,
      },
      subbutton: {
        label: 'Нет аккаунта?',
        attrs: {
          class: styles.subbutton,
        },
      },
    });

    app.append(authPage.getContent()!);
    authPage.dispatchComponentDidMount();
  } else if (pathname === '/registration.html') {
    const authPage = new FormPage({
      title: 'Регистрация',
      fields: [
        {
          name: 'mail',
          required: true,
          label: 'Почта',
          isFormField: true,
          validator: useMailValidator,
        },
        {
          name: 'login',
          required: true,
          label: 'Логин',
          isFormField: true,
          validator: useUsernameValidator,
        }, {
          name: 'first_name',
          required: true,
          label: 'Имя',
          isFormField: true,
          validator: useNameValidator,
        },
        {
          name: 'second_name ',
          required: true,
          label: 'Фамилия',
          isFormField: true,
          validator: useNameValidator,
        }, {
          name: 'phone',
          required: true,
          label: 'Телефон',
          isFormField: true,
          validator: usePhoneValidator,
        },
        {
          name: 'password',
          required: true,
          label: 'Пароль',
          isFormField: true,
          type: 'password',
          validator: usePasswordValidator,
        },
      ],
      submitButton: {
        label: 'Зарегистрироваться',
        isPrimary: true,
      },
      subbutton: {
        label: 'Войти',
        attrs: {
          class: styles.subbutton,
        },
      },
    });

    app.append(authPage.getContent()!);
    authPage.dispatchComponentDidMount();
  } else if (pathname === '/profile.html') {
    const profilePage = new ProfilePage({
      editMode: editModsProp.NOTHING,
      isEditMode: false,
      isPasswordEditMode: false,
      user: {
        avatar: 'blank.png',
        phone: '+ 7 999 888-22-22',
        name: 'Артём',
        surname: 'Марченко',
        login: 'pritornyi',
        username: 'Pritornyi',
        mail: 'i@pritornyi.ru',
      },
    });

    app.append(profilePage.getContent()!);
    profilePage.dispatchComponentDidMount();
  } else if (pathname === '/profile2.html') {
    const profilePage = new ProfilePage({
      editMode: editModsProp.DATA,
      isEditMode: true,
      isPasswordEditMode: false,
      user: {
        avatar: 'blank.png',
        phone: '+ 7 999 888-22-22',
        name: 'Артём',
        surname: 'Марченко',
        login: 'pritornyi',
        username: 'Pritornyi',
        mail: 'i@pritornyi.ru',
      },
    });

    app.append(profilePage.getContent()!);
    profilePage.dispatchComponentDidMount();
  } else if (pathname === '/profile3.html') {
    const profilePage = new ProfilePage({
      editMode: editModsProp.PASSWORD,
      isEditMode: false,
      isPasswordEditMode: true,
      user: {
        avatar: 'blank.png',
        phone: '+ 7 999 888-22-22',
        name: 'Артём',
        surname: 'Марченко',
        login: 'pritornyi',
        username: 'Pritornyi',
        mail: 'i@pritornyi.ru',
      },
    });

    app.append(profilePage.getContent()!);
    profilePage.dispatchComponentDidMount();
  } else {
    const exceptionPage = new ExceptionPage({
      code: `${404}`,
      title: 'Не туда попали',
      return: {
        label: 'Назад к чатам',
      },
    });

    app.append(exceptionPage.getContent()!);
    exceptionPage.dispatchComponentDidMount();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  if (app === null) {
    throw new Error('#app element does not exist');
  }

  router(app, window.location.pathname);
});
