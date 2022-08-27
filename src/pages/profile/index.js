import profile from './profile.hbs'
import * as styles from './profile.scss'

export default (props) => {
    const credentials = [
        {
            title: 'Почта',
            value: 'pochta@yandex.ru'
        },
        {
            title: 'Логин',
            value: 'ivanivanov'
        },
        {
            title: 'Имя',
            value: 'Иван'
        },
        {
            title: 'Фамилия',
            value: 'Иванов'
        },
        {
            title: 'Имя в чате',
            value: 'Иван'
        },
        {
            title: 'Телефон',
            value: '+7 (909) 967 30 30'
        },
    ]
    return profile({styles, ...props, credentials})
}