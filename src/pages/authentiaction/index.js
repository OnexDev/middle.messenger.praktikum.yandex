import auth from './authentiaction.hbs'
import styles from './authentiaction.scss'

export default (props) => {
    return auth({styles, ...props})
}