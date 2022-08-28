import profile from './profile.hbs'
import * as styles from './profile.scss'

export default (props) => {
    const credentials = [
        {
            title: 'Почта',
            value: 'pochta@yandex.ru',
            name:'email',
        },
        {
            title: 'Логин',
            value: 'ivanivanov',
            name:'login'
        },
        {
            title: 'Имя',
            value: 'Иван',
            name: 'first_name'
        },
        {
            title: 'Фамилия',
            value: 'Иванов',
            name: 'second_name'
        },
        {
            title: 'Имя в чате',
            value: 'Иван',
            name: 'chat_name'
        },
        {
            title: 'Телефон',
            value: '+7 (909) 967 30 30',
            name: 'phone'
        },
    ]
    return profile({styles, ...props, credentials})
}