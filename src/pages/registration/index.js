import auth from './registation.hbs'
import styles from '../authentiaction/authentiaction.scss'

export default (props) => {
    return auth({styles, ...props})
}