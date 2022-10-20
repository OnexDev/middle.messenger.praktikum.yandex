# [Yandex Praktikum Messenger](https://github.com/OnexDev/middle.messenger.praktikum.yandex) &middot; Training project &middot; ![Repo size](https://img.shields.io/github/repo-size/onexdev/middle.messenger.praktikum.yandex)

#### Данный проект создан в рамках прохождения первого модуля обучения по программе курса middle frontend разработчик.

Реализуется от прототипа на бумаге до развёртывания в Docker контейнере на Heroku.

## Руководство

В проекте используется `yarn` в качестве пакетного менеджера. Сборку осуществляет `webpack`.

### Установка

Для установки проекта необходимо:

1. Выполнить локальное клонирование репозитория.
2. Установить node.js зависимости воспользовавшись командой `yarn install` или `yarn`.
3. Запустить проект командой `yarn serve`.

### Документация

Запуск проекта: `yarn serve`. Адрес: `localhost:3000`.

Сборка docker образа `docker build -t chat-app .`

Запуск docker образа `docker run -p 3000:3000 -t chat-app`


###### Значение порта по умолчанию можно изменить путём модификации параметра port.

Webpack сборка проекта: `yarn build`.

Webpack сборка в dev режиме: `yarn build:dev`.

## Актуальный статус

Sprint 1: Merged.

Sprint 2: Merged.

Sprint 3: Merged.

Sprint 4: In review...

### Netlify badges

[![Netlify Status](https://api.netlify.com/api/v1/badges/840fe653-3cee-4c38-99e6-56f885282e0f/deploy-status)](https://app.netlify.com/sites/pritornyi-msg/deploys)
![Contributors](https://img.shields.io/website?label=netlify&url=https%3A%2F%2Fpritornyi-msg.netlify.app%2F)

## FAQ 
Версия ноды: `v16.17.0`

Принято использования `camelCase`

Typescript `only`

Websocket `ready`

CSS Modules: `enabled`

## Resources

Figma: https://www.figma.com/file/tJesHhPmqV1zzyNbDJL85m/Y.Messanger?node-id=12%3A35

Netlify: https://pritornyi-msg.netlify.app/
